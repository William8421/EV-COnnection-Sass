import { useEffect } from "react";

import useAuth from "../../../context/authContext/useAuth.js";
import { useLocation } from "react-router-dom";
import noPhoto from "../../../img/noPhoto.png";
import Review from "./Review.js";
import NotAuthorized from "../../error/NotAuthorized.js";
import MessagesForm from "../../directMessages/MessagesForm.js";
import { Image } from "cloudinary-react";


function OwnerProfile() {
  const { getProfileInfo, userInfo, isAuthenticated } = useAuth();

  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { id } = location.state;
      const pathEnd = location.pathname.split("/userProfile/")[1];
      id !== null ? getProfileInfo(pathEnd) : getProfileInfo(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.id]);


  return (
    <>
    {isAuthenticated ?
    <div className="userProfileContainer">
     
        <>
          <div className="userProfileSubContainer">
            {userInfo.imgProfile && userInfo.imgProfile !== "no_photo" ? (
              <div>
                <div className="userProfileImgContainer">
                  <Image
                    className="userImage"
                    cloudName="schoolgroupfinal"
                    publicId={userInfo.imgProfile}
                  />
                </div>
                <MessagesForm userInfo={userInfo}/>
              </div>
            ) : (
              <div>
                <div className="userProfileImgContainer">
                  <Image className="userImage" src={noPhoto} alt="user" />
                </div>
                <MessagesForm userInfo={userInfo}/>
              </div>
            )}
            <div className="userProfileDataContainer">
              <div className="dataContainer">
                <p>User Name:</p>
                <p>{userInfo.username}</p>
              </div>
              <div className="dataContainer">
                <p>First Name:</p>
                <p>{userInfo.fname}</p>
              </div>
              <div className="dataContainer">
                <p>Last Name:</p>
                <p>{userInfo.lname}</p>
              </div>
              <div className="dataContainer">
                <p>Email:</p>
                <p>{userInfo.email}</p>
              </div>
              {userInfo.isOwner && (
                <div className="dataContainer">
                <p>Availability:</p>
                <p>
                  {userInfo.availability}
                </p>
              </div>
              )}
              {userInfo.isOwner && (
                <div className="dataContainer">
                  <p>Address:</p>
                  <p>
                    {userInfo.address.street}
                    {userInfo.address.houseNr}, {userInfo.address.postalcode}
                    <br></br>{userInfo.address.city}
                  </p>
                </div>
              )}
             
              {userInfo.telNumber && (
                <div className="dataContainer">
                  <p>Phone Number</p>
                  <p>{userInfo.telNumber}</p>
                </div>
              )}
            </div>
          </div>

          <Review />
        </>
      
      
    </div> : <NotAuthorized/>}
    </>
    
  );
}
export default OwnerProfile;
