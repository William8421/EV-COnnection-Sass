import React, { useEffect, useState } from "react";
import { FormGroup, Input, Form } from "reactstrap";
import useComments from "../../../context/commentsContext/useComments.js";

function CommentForm() {
  const initState = {
    username: "",
    userId: null,
    comment: "",
  };
  const { addAComment } = useComments();
  const [comment, setComment] = useState(initState);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setComment({
        ...comment,
        username: user.username,
        userId: user.id,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function changeHandler(e) {
    setComment((prevState) => {
      return { ...prevState, comment: e.target.value };
    });
  }
  function submit(e) {
    e.preventDefault();
    addAComment(comment);
    e.target.reset();
  }

  return (
    <Form onSubmit={submit}>
      <div onChange={changeHandler}>
        <FormGroup className=" commentsFormGroup ">
          <Input
            className="messageInput"
            id="exampleText"
            name="text"
            type="textarea"
            placeholder="Leave a Message"
            rows="8"
            cols="20"
            required
          />
        </FormGroup>
      </div>
      <div className="messageButtonContainer">
        <button className="ourButton" type="submit">Send</button>
      </div>
    </Form>
  );
}

export default CommentForm;
