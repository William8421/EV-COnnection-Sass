import React, { useState, useEffect } from "react";
import { Form, Input, FormGroup } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import useComments from "../../../context/commentsContext/useComments";
import useAuth from "../../../context/authContext/useAuth";
import Pages from "../../pagination/Pages";

import noPhoto from "../../../img/noPhoto.png";
import { Image } from "cloudinary-react";

function Review() {
  const location = useLocation();
  const pathUrl = location.pathname;

  const { addAReview, getReviews, allReviews, state } = useComments();
  const { getProfileInfo, isAuthenticated } = useAuth();

  const initState = {
    fromUsername: "",
    fromUserId: null,
    review: "",
    toUserId: null,
  };

  const [review, setReview] = useState(initState);

  /** */
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentReviews = allReviews.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const numberOfPages = Math.ceil(allReviews.length / commentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  /** */

  useEffect(() => {
    const pathEnd = +location.pathname.split("/userProfile/")[1];
    getReviews(pathEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.review]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const pathEnd = +location.pathname.split("/userProfile/")[1];
      setReview({
        ...review,
        fromUserId: user.id,
        fromUsername: user.username,
        fromImgProfile: user.imgProfile,
        toUserId: pathEnd,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeHandler(e) {
    setReview((prevState) => {
      return { ...prevState, review: e.target.value };
    });
  }
  function submit(e) {
    e.preventDefault();
    addAReview(review);
    e.target.reset();
  }
  return (
    <div className="reviewsContainer">
      {localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id !==
            +pathUrl.split("/userProfile/")[1] && (
            <Form onSubmit={submit}>
              <div onChange={changeHandler}>
                <FormGroup>
                  <Input
                    className="reviewInput"
                    id="exampleText"
                    name="text"
                    type="textarea"
                    placeholder="Add a Review"
                    required
                  />
                </FormGroup>
              </div>
              <div className="buttonContainer">
                <button className="ourButton" type="submit">
                  Send
                </button>
              </div>
            </Form>
          )
        : null}
      {currentReviews.map((item, idx) => {
        return (
          <div className="mainDivContainer" key={idx + ""}>
            <div className="reviewsSubContainer">
              <div className="imageUserNameContainer">
                {item.fromImgProfile === "no_photo" ? (
                  <div className="reviewerImgContainer">
                    <img src={noPhoto} alt="user" />
                  </div>
                ) : (
                  <div className="reviewerImgContainer">
                    <Image
                      className="reviewerImage"
                      cloudName="schoolgroupfinal"
                      publicId={item.fromImgProfile}
                    />
                  </div>
                )}
                <div className="linkContainer">
                  <Link
                    className="reviewerUserNameLink"
                    to={`/userProfile/${item.fromUserId}`}
                    state={{ id: item.fromUserId }}
                    onClick={() => getProfileInfo(item.fromUserId)}
                  >
                    {item.fromUsername}
                  </Link>
                </div>
              </div>

                <div className="reviewsInfo">
                <p className=" date">
                  <b>Date: </b> {item.dateNow[0]}
                </p>
                <p className="reviewerMessageKey">
                  <b>Message: </b>{" "}
                </p>
                <p className="reviewerMessage">
                  {item.review}
                </p>
                </div>
            </div>
          </div>
        );
      })}
      <div>
        <Pages
          paginate={paginate}
          numberOfPages={numberOfPages}
          pages={allReviews}
        />
      </div>
    </div>
  );
}

export default Review;
