import React, { useEffect, useState } from "react";
import useComments from "../../context/commentsContext/useComments";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Fade, Form, FormGroup, Input } from "reactstrap";


import noPhoto from "../../img/noPhoto.png";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
function Conversations() {
  const {
    getAllConversations,
    allConversations,
    getDirectMsgs,
    allDirectMsgs,
    addADirectMsg,
  } = useComments();
  const [user, setUser] = useState({});
  const [dirMsgs, setDirMsgs] = useState();
  const [modal, setModal] = useState(false);
  const initState = { directMsg: "", senderId: "", receiverId: "" };
  const [message, setMessage] = useState(initState);
  const [requiredToggle, setRequiredToggle] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getDirectMsgs({ conversationId: dirMsgs });
    console.log(allDirectMsgs);
  }, [modal, addADirectMsg]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      getAllConversations({ userId: user.id });
    }
  }, []);

  function inputHandler(e) {
    setMessage((prev) => ({
      directMsg: e.target.value,
      senderId: user !== null ? user.id : null,
      receiverId:
        allDirectMsgs.firId === user.id
          ? allDirectMsgs.secId
          : allDirectMsgs.firId,
    }));
  }
  function submit(e) {
    if (message.directMsg === "") return setRequiredToggle(true);
    addADirectMsg(message);
  }

  return (
    <Fade className="conversationsContainer">
      {allConversations.map((item, idx) => {
        return (
          <div key={idx + ""}>
            <p
              onClick={() => {
                setDirMsgs(item.conversationId);
                setModal(!modal);
              }}
            >
              {item.senderId !== user.id ? item.senderName : item.receiverName}
            </p>
          </div>
        );
      })}
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Messages</ModalHeader>
        <ModalBody>
          <div className=" singleConversationContainer">
            <Form>
              <FormGroup>
                <Input
                  placeholder="Your Message"
                  onChange={inputHandler}
                  onFocus={() => setRequiredToggle(false)}
                  rows="3"
                  name="text"
                  type="textarea"
                />
                {requiredToggle && (
                  <Fade className="emptyErrorMessage">
                    Please add a{" "}
                    <span>
                      <b>Message</b>
                    </span>
                  </Fade>
                )}
              </FormGroup>
            </Form>
            <button className="ourButton" onClick={submit}>
              Reply
            </button>
            {allDirectMsgs.sortedConv &&
              allDirectMsgs.sortedConv.map((item, idx) => {
                if (item.currentMessageSender === user.id) {
                  return (
                    <div
                      key={idx + ""}
                     className="senderContainer"
                    >
                      {user.imgProfile === "no_photo" ? (
                        <>
                          <div>
                            <div className="senderImgContainer">
                              <img src={noPhoto} alt="user" />
                            </div>
                            <p className="senderDate">
                              <small>{item.dateNow && item.dateNow[0]}</small>
                            </p>
                          </div>
                          <p className="senderMessage">{item.messageText}</p>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="senderImgContainer">
                              <Image
                                className="senderImage"
                                cloudName="schoolgroupfinal"
                                publicId={user.imgProfile}
                              />
                            </div>
                            <p className="senderDate">
                              <small>{item.dateNow && item.dateNow[0]}</small>
                            </p>
                          </div>
                          <p className="senderMessage"> {item.messageText}</p>
                        </>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={idx + ""} className="receiverContainer">
                      <div className="receiverSubContainer">
                        {user.id === allDirectMsgs.firId ? (
                          allDirectMsgs.secImgProfile === "no_photo" ? (
                            <div>
                              <div className="receiverImgNameContainer">
                              <div className="receiverImgContainer">
                                  <img src={noPhoto} alt="user" />
                                </div>
                                <p className="receiverDate">
                                  <small>
                                    {item.dateNow && item.dateNow[0]}
                                  </small>
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div style={{ backgroundColor: "red" }}>
                              <div className="receiverImgNameContainer">
                              <div className="receiverImgContainer">
                                  <Image
                                  className="receiverImage"
                                    cloudName="schoolgroupfinal"
                                    publicId={allDirectMsgs.secImgProfile}
                                  />
                                </div>
                                <p className="receiverDate">
                                  <small>
                                    {item.dateNow && item.dateNow[0]}
                                  </small>
                                </p>
                              </div>
                            </div>
                          )
                        ) : allDirectMsgs.firImgProfile === "no_photo" ? ( // else
                          <div>
                            <div className="receiverImgNameContainer">
                              <div className="receiverImgContainer">
                                <img src={noPhoto} alt="user" />
                              </div>
                              <p className="receiverDate">
                                <small>{item.dateNow && item.dateNow[0]}</small>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="receiverImgNameContainer">
                              <div className="receiverImgContainer">
                                <Image
                                  className="receiverImage"
                                  cloudName="schoolgroupfinal"
                                  publicId={allDirectMsgs.firImgProfile}
                                />
                              </div>
                              <p className="receiverDate">
                                <small>{item.dateNow && item.dateNow[0]}</small>
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="receiverMessageContainer">
                          <Link
                          className="receiverUserNameLink"
                            to={
                              user.id === allDirectMsgs.secId
                                ? `/userProfile/${allDirectMsgs.firId}`
                                : `/userProfile/${allDirectMsgs.secId}`
                            }
                            state={
                              user.id === allDirectMsgs.secId
                                ? { id: allDirectMsgs.firId }
                                : { id: allDirectMsgs.secId }
                            }
                          >
                            <div>
                              <p className="receiverName">
                                <b>
                                  {user.id === allDirectMsgs.secId
                                    ? allDirectMsgs.firName
                                    : allDirectMsgs.secName}
                                </b>
                              </p>
                            </div>
                          </Link>
                          <p className="receiverMessage">{item.messageText}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </Fade>
  );
}

export default Conversations;
