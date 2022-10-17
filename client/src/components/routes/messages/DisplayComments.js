import React, { useEffect, useState } from "react";
import useComments from "../../../context/commentsContext/useComments.js";
import noPhoto from "../../../img/noPhoto.png";
import Pages from "../../pagination/Pages.js";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

function DisplayComments() {
  const { state, getAllComments, allComments } = useComments();

  /** */
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = allComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const numberOfPages = Math.ceil(allComments.length / commentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.comment]);

  return (
    <>
      <div className="mainMessageDivStyle">
        {currentComments.map((item, idx) => {
          return (
            <div key={idx} className="commentsContainer">
              <div className="box1">
                {item.imgProfile === "no_photo" ? (
                  <div className="messageImgContainer">
                    <img
                      src={noPhoto}
                      alt="user"
                      className="messageProfileImg"
                    />
                  </div>
                ) : (
                  <div className="messageImgContainer">
                    <Image
                      className="messageProfileImg"
                      cloudName="schoolgroupfinal"
                      publicId={item.imgProfile}
                    />
                  </div>
                )}
                <Link
                  className="userNameLink"
                  to={`/userProfile/${item.userId}`}
                  state={{ id: item.userId }}
                >
                  {item.username}
                </Link>
              </div>
              <div className="box2">
                <p>
                  <b>Date: </b> {item.dateNow[0]} {/* {item.dateNow[1]} */}
                </p>
                <p>
                  <b>Message: </b>{" "}
                </p>
                <p>{item.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
      <Pages paginate={paginate} numberOfPages={numberOfPages} pages={allComments} />
      </div>
    </>
  );
}

export default DisplayComments;
