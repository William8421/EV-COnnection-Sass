import React, { useEffect, useState } from "react";
import useComments from "../../../context/commentsContext/useComments";
import useAuth from "../../../context/authContext/useAuth";
import Pages from "../../pagination/Pages";

import noPhoto from "../../../img/noPhoto.png";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

function MyReviews({ userInfo }) {
  const { getReviews, allReviews } = useComments();
  const { getProfileInfo } = useAuth();

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

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getReviews(userInfo.id);
    }
  }, []);

  return (
    <>
      {currentReviews.length === 0 ? <p className="noReviews">You have no reviews</p> : currentReviews.map((item, idx) => {
        return (
          <div className="myReviewsContainer" key={idx + "comment"}>
            <div className="myReviewSubContainer">
            {item.fromImgProfile === "no_photo" ? (
              <div>
                <img className="reviewImg" src={noPhoto} alt="user"/>
              </div>
            ) : (
              <div className="photoLinkContainer">
                <div>
                  <Image
                    className="reviewImg"
                    cloudName="schoolgroupfinal"
                    publicId={item.fromImgProfile}
                  />
                </div>
                <Link
                className="fromUserLink"
                  to={`/userProfile/${item.fromUserId}`}
                  state={{ id: item.fromUserId }}
                  onClick={() => getProfileInfo(item.fromUserId)}
                >
                  {item.fromUsername}
                </Link>
              </div>
            )}
            <div className="reviewInformation">
            <p>
              <span>Date:</span> {item.dateNow[0]}
            </p>

            <div className="reviewContainer">
              <span>Message:</span>
              <p>{item.review}</p>
            </div>
          </div>
          </div>
      </div>
        );
      })}
      <div>
        <Pages paginate={paginate} numberOfPages={numberOfPages} pages={allReviews} />
      </div>
    </>
  );
}

export default MyReviews;
