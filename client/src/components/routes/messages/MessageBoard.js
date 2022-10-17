import React from "react";
import CommentForm from "./CommentForm.js";
import DisplayComments from "./DisplayComments.js";
import useAuth from "../../../context/authContext/useAuth.js";
import NotAuthorized from "../../error/NotAuthorized.js";

function MessageBoard() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="messageBoardContainer">
    <h1>Message Board</h1>
      {isAuthenticated ? (
        <>
          <CommentForm />
          <DisplayComments />
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default MessageBoard;
