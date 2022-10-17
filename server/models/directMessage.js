import mongoose from "mongoose";


const directMessageSchema = new mongoose.Schema(
  {
    senderId: {type: Number},
    receiverId: {type: Number},
    messagesArray: {type: Array},
    createdAt: { type: String },
    dateNow: { type: Array },
  },
  { timestamps: true }
);

const myConversation= mongoose.model("myConversation", directMessageSchema);

export default myConversation;
