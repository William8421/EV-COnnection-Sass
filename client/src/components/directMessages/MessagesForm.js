import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import NotAuthorized from "../error/NotAuthorized";
import useComments from "../../context/commentsContext/useComments.js";
import { Fade } from "reactstrap";

function MessagesForm({userInfo}) {
  const location = useLocation();
  const pathUrl = location.pathname;
  const { addADirectMsg } = useComments();
  const initState = { directMsg: "", senderId: "", receiverId: "" };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const [requiredToggle, setRequiredToggle] = useState(false);
  const [message, setMessage] = useState(initState);

  useEffect(() => {
    // id of the sender, the id of the receiver, message, date and date now
    const sender = JSON.parse(localStorage.getItem("user"));
    const receiverId = +pathUrl.split("/userProfile/")[1];
    setMessage({
      directMsg: "",
      senderId: sender !== null ? sender.id: null,
      receiverId: receiverId,
    });
    setRequiredToggle(false)
  }, [modal]);

  function inputHandler(e) {
    setMessage((prev) => ({
      ...prev,
      directMsg: e.target.value,
    }));
   
  }

  function submit() {
    if (message.directMsg === "") return setRequiredToggle(true);

    addADirectMsg(message);
    toggle();
  }

  return (
    <div>
      {JSON.parse(localStorage.getItem("user")).id !==
        +pathUrl.split("/userProfile/")[1] && (
        <button className="ourButton" onClick={toggle}>
          Contact User
        </button>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>To: <span className="toUserName">{userInfo.username}</span></ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                placeholder="Your Message"
                onChange={inputHandler}
                onFocus={()=>setRequiredToggle(false)}
                rows="6"
                name="text"
                type="textarea"
              />
              {requiredToggle && <Fade className="emptyErrorMessage">
                Please add a <span><b>Message</b></span>
              </Fade>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className='ourButton'  onClick={submit} type="submit">
            Send
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MessagesForm;
