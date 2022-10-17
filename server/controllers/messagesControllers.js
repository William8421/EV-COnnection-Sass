import boardComment from "../models/boardComment.js";
import reviewModel from "../models/reviewModel.js";
import userApp from "../models/userApp.js";
import myConversation from "../models/directMessage.js";

const getConversations = async (req, res) => {
  const { userId } = req.body;

  const user = await userApp
    .findOne({ id: userId }, (err, doc) => {
      if (err) return res.status(400).json(err);
      else {
        const sortedConv = doc.activeConversation.sort(
          (a, b) => b.updatedAt - a.updatedAt
        );

        res.status(200).json(sortedConv);
      }
    })
    .clone();
};

const getAllComments = async (req, res) => {
  try {
    const response = await boardComment.find().populate("author");
    response.map((item) => {
      item.imgProfile = item.author[0].imgProfile;
      item.username = item.author[0].username;
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getReviews = async (req, res) => {
  try {
    const response = await reviewModel
      .find({ toUserId: req.body.ownerId })
      .populate("author");

    response.forEach((item) => {
      item.fromImgProfile = item.author[0].imgProfile;
      item.fromUsername = item.author[0].username;
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

async function getDirectMsgs(req, res) {
  const { conversationId } = req.body;

  try {
    const conversation = await myConversation.findOne({ _id: conversationId });
    const sortedConv = conversation.messagesArray.sort(
      (a, b) => b.creationTime - a.creationTime
    );
    const users = await userApp.find({
      id: { $in: [conversation.senderId, conversation.receiverId] },
    });
    const response = {
      sortedConv,
      firId: users[0].id,
      firName: users[0].username,
      firImgProfile: users[0].imgProfile,
      secId: users[1].id,
      secName: users[1].username,
      secImgProfile: users[1].imgProfile,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function addADirectMsg(req, res) {
  const { directMsg, senderId, receiverId, createdAt, dateNow } = req.body;

    console.log("my data", directMsg, senderId, receiverId, createdAt, dateNow);

  const receiverName = await userApp.findOne({ id: receiverId });
  const senderName = await userApp.findOne({ id: senderId });

  console.log("receiver", receiverName.username);
  console.log("sender", receiverName.username);

  try {
    myConversation.find(
      {
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      (err, doc) => {
        if (err) return console.log("error", err);
        else {
          if (doc.length === 0) {
            const newMessages = new myConversation({
              createdAt,
              senderId,
              receiverId,
              updatedAt: Date.now(),
              dateNow: dateNow,
              receiverName: receiverName.username,
              senderName: senderName.username,
              messagesArray: [
                {
                  messageText: directMsg,
                  creationTime: Date.now(),
                  currentMessageSender: senderId,
              dateNow: dateNow,

                },
              ], 
            });
            newMessages.save((err, doc) => {
              if (err) return console.log("err", err);

              userApp.updateMany(
                { $or: [{ id: senderId }, { id: receiverId }] },
                {
                  $push: {
                    activeConversation: {
                      conversationId: doc._id,
                      updatedAt: Date.now(),
                      senderId,
                      receiverId,
                      receiverName: receiverName.username,
                      senderName: senderName.username,
                      dateNow: dateNow,
                    },
                  },
                },
                (err, doc) => {
                  if (err) return console.log(("err", err));
                  else console.log("doc", doc);
                }
              );
            });
          }
          // if there was an ongoing conversation between both users
          else {
            /*  console.log("a conversation already with id", doc[0]._id); */
            myConversation.findByIdAndUpdate(
              { _id: doc[0]._id },
              {
                updatedAt: Date.now(),
                $push: {
                  messagesArray: {
                    messageText: directMsg,
                    creationTime: Date.now(),
                    dateNow: dateNow,
                    currentMessageSender: senderId,
                  },
                },
              },
              (err, doc) => {
                if (err)
                  return console.log(
                    "error whiled updating messages collection",
                    err
                  );
                /*  console.log("doc on updating messages collection", doc); */

                // At this point i am searching both the users and filtering their conversation according to the conversation id and then modifying the updated at
                userApp.updateMany(
                  {
                    $or: [{ id: senderId }, { id: receiverId }],
                    "activeConversation.conversationId": doc._id,
                  },
                  {
                    $set: { "activeConversation.$.updatedAt": Date.now() },
                  },
                  (err, doc) => {
                    if (err)
                      return console.log(
                        "err occured while updating userprofile conversations",
                        err
                      );
                    /*  console.log(
                      "Document of both users updated successfully",
                      doc
                    ); */
                  }
                );
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
}

const addAComment = async (req, res) => {
  try {
    const { comment, userId, createdAt, dateNow } = req.body;
    const allComments = await boardComment.find();

    const commentId =
      allComments.reduce((a, b) => {
        return Math.max(a, b.commentId);
      }, 0) + 1;

    const author = await userApp.find({ id: userId });
    const newBoardComment = await boardComment.create({
      username: author[0].username,
      author: author[0]._id.toString(),
      comment,
      commentId,
      userId,
      createdAt,
      dateNow,
    });
    await userApp.findOneAndUpdate(
      { id: userId },
      {
        $push: { comments: { comment, createdAt, dateNow } },
      }
    );

    res.status(200).json(newBoardComment);
  } catch (err) {
    res.status(400).json({ errorMessage: err.message });
  }
};
const addAReview = async (req, res) => {
  try {
    const { fromUserId, review, toUsername, toUserId, createdAt, dateNow } =
      req.body;
    const allReviews = await reviewModel.find();
    const reviewIdNew =
      allReviews.reduce((a, b) => {
        return Math.max(a, b.reviewId);
      }, 0) + 1;

    const author = await userApp.find({ id: fromUserId });
    const newReviewComment = await reviewModel.create({
      reviewId: reviewIdNew,
      fromUserId,
      review,
      toUsername,
      toUserId,
      createdAt,
      dateNow,
      author: author[0]._id.toString(),
    });

    res.status(200).json(newReviewComment);
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllComments,
  addAComment,
  addAReview,
  getReviews,
  addADirectMsg,
  getConversations,
  getDirectMsgs,
};
