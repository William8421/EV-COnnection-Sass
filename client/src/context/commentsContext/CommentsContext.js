import { createContext, useReducer } from "react";
import commentsReducer, { commentsState } from "./commentsReducer";

import {
  addComment,
  allComments,
  addReview,
  allReviews,
  addDirectMsg,
  getUserDirectMsgs,
  getConversations
} from "../../utils/axios-utils.js";

export const CommentsContext = createContext(commentsState);

export const CommentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, commentsState);

  async function addADirectMsg(msgObj) {
    const current = new Date();
    const msgObjComplete = {
      ...msgObj,
      createdAt: Date.now(),
      dateNow: [
        `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`,
        `${current.getHours()}:${
          current.getMinutes() + 1
        }:${current.getSeconds()}`,
      ],
    };
    try {
      const response = await addDirectMsg(msgObjComplete);
      dispatch({ type: "ADD_DI_MSG", payload: response.data });
      
    } catch (err) {
      console.log(err);
    }
  }
  async function addAComment(comment) {
    const current = new Date();
    const commentComplete = {
      ...comment,
      createdAt: Date.now(),
      dateNow: [
        `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`,
        `${current.getHours()}:${
          current.getMinutes() + 1
        }:${current.getSeconds()}`,
      ],
    };

    try {
      const response = await addComment(commentComplete);
      dispatch({ type: "ADD_COMMENT", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  }
  async function addAReview(review) {
    const current = new Date();
    const reviewComplete = {
      ...review,
      createdAt: Date.now(),
      dateNow: [
        `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`,
        `${current.getHours()}:${
          current.getMinutes() + 1
        }:${current.getSeconds()}`,
      ],
    };
    try {
      const response = await addReview(reviewComplete);

      dispatch({ type: "ADD_REVIEW", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllConversations(convObj) {
    try {
      const response = await getConversations(convObj);
      dispatch({ type: "ALL_CONVERSATIONS", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  async function getDirectMsgs(conversationId) {
    try {
      const response = await getUserDirectMsgs(conversationId);
      dispatch({ type: "ALL_DI_MSGS", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  }
  
  async function getAllComments() {
    try {
      const response = await allComments();
      const sortedComments = response.data.sort(
        (a, b) => +b.createdAt - +a.createdAt
      );
      dispatch({ type: "ALL_COMMENTS", payload: sortedComments });
    } catch (err) {
      console.log(err);
    }
  }

  async function getReviews(ownerId) {
    try {
      const response = await allReviews(ownerId);
      const sortedComments = response.data.sort(
        (a, b) => +b.createdAt - +a.createdAt
      );
      dispatch({ type: "ALL_REVIEWS", payload: sortedComments });
    } catch (err) {
      console.log(err);
    }
  }


  const value = {
    addAComment,
    getAllComments,
    state,
    allComments: state.allComments,
    addAReview,
    allReviews: state.allReviews,
    getReviews,
    addADirectMsg,
    directMsg: state.directMsg,
    getDirectMsgs,
    allDirectMsgs: state.allDirectMsgs,
    getAllConversations,
    allConversations: state.allConversations,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
