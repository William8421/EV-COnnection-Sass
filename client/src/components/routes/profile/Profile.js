import { useEffect, useState } from "react";

import useAuth from "../../../context/authContext/useAuth.js";
import { Image } from "cloudinary-react";
import noPhoto from "../../../img/noPhoto.png";
import NotAuthorized from "../../error/NotAuthorized.js";
import EditProfile from "../profile/EditProfile.js";
import MyReviews from "./MyReviews.js";
import Conversations from "../../directMessages/Conversations.js";

function Profile() {
  const { isAuthenticated, getProfileInfo, userInfo } = useAuth();
  const [editToggle, setEditToggle] = useState(false);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [msgToggle, setMsgToggle] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      getProfileInfo(user.id);
    }
  }, [editToggle]);
  function mainToggle(e) {
    e.preventDefault();
    const value = e.target.value;

    if (value === "messages") {
      setReviewToggle(false);
      setMsgToggle(true);
    }
    if (value === "reviews") {
      setReviewToggle(true);
      setMsgToggle(false);

    }
  }
  return (
    <div>
      {isAuthenticated ? (
        userInfo && (
          <>
            <div className="profileContainer">
              {userInfo.imgProfile === "no_photo" ? (
                <div className="ProfileImgContainer">
                  <img className="profileImage" src={noPhoto} alt="user" />
                </div>
              ) : (
                <div className="ProfileImgContainer">
                  <Image
                    className="profileImage"
                    cloudName="schoolgroupfinal"
                    publicId={userInfo.imgProfile}
                  />
                </div>
              )}
              <div className="profileInfoContainer">
                <div className="profileInfo">
                  <p>User Name</p>
                  <p>{userInfo.username}</p>
                </div>
                <div className="profileInfo">
                  <p>First Name</p>
                  <p>{userInfo.fname}</p>
                </div>
                <div className="profileInfo">
                  <p>Last Name</p>
                  <p>{userInfo.lname}</p>
                </div>
                <div className="profileInfo">
                  <p>Email</p>
                  <p>{userInfo.email}</p>
                </div>
                {userInfo.isOwner && (
                <div className="profileInfo">
                <p>Availability:</p>
                <p>
                  {userInfo.availability}
                </p>
              </div>
              )}
                {userInfo.isOwner && (
                  <div className="profileInfo">
                    <p>Address:</p>
                    <p>
                      {userInfo.address.street}
                      {userInfo.address.houseNr}, {userInfo.address.postalcode}{" "}
                      {userInfo.address.city}
                    </p>
                  </div>
                )}
              {userInfo.telNumber && (
                <div className="profileInfo">
                  <p>Phone Number</p>
                  <p>{userInfo.telNumber}</p>
                </div>
              )}
              </div>
            </div>
            <div className="profileButtonContainer">
              <button className="ourButton"
                onClick={() =>
                  editToggle ? setEditToggle(false) : setEditToggle(true)
                }
              >
                Edit Profile
              </button>
            {reviewToggle ? <button className="ourButton" onClick={()=>setReviewToggle(false)} value="reviews">
                Hide Reviews
              </button> : <button className="ourButton" onClick={mainToggle} value="reviews">
                Show Reviews
              </button>}
              {msgToggle ? <button className="ourButton" onClick={()=>setMsgToggle(false)} value="messages">
                Hide Messages
              </button> : <button className="ourButton" onClick={mainToggle} value="messages">
               Show Messages
              </button>}
              
            </div>
          </>
        )
      ) : (
        <NotAuthorized />
      )}
      {editToggle && (
        <EditProfile editToggle={editToggle} setEditToggle={setEditToggle} />
      )}
      {reviewToggle && <MyReviews userInfo={userInfo} />}
      {msgToggle && <Conversations />}
    </div>
  );
}
export default Profile;
