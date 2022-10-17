import axios from "axios";

export const clientAPI = axios.create({ baseURL: "https://evconnection.herokuapp.com" });

export const signup = (user) => clientAPI.post("/user/sign_up", user);

export const login = (user) => clientAPI.post("/user/login", user);

export const validateToken = () => {
  if (!localStorage.getItem("user")) {
    return null;
  } else {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    return clientAPI.get("/user/tokenValidation", {
      headers: {
        Authorization: `Bearer ${parsedUser.token}`,
      },
    });
  }
};
export const getProfile = (userId) =>
  clientAPI.post("/user/profileInfo", { id: userId });
  
export const getAllOwners = (typeOfCharger) =>
  clientAPI.post("/user/getAllOwners", { typeOfCharger: typeOfCharger });

export const editProfile = (editedUser, id) =>
  clientAPI.put(`/user/updateProfile/${id}`, editedUser);

export const getRouteCoordiantes = (routeForm) =>
  clientAPI.post("/openMaps/getCoordinates", { routeForm });

export const addComment = (comment) =>
  clientAPI.post("/messages/addAComment", comment);

export const allComments = () => clientAPI.get("/messages/getAllComments");

export const addReview = (review) =>
  clientAPI.post("/messages/addAReview", review);
export const allReviews = (ownerId) =>
  clientAPI.post("/messages/getReviews", { ownerId });

export const addDirectMsg = (msgObj) =>
  clientAPI.post("/messages/addADirectMsg", msgObj);

export const getUserDirectMsgs = (conversationId) =>
  clientAPI.post("/messages/getDirectMsgs", conversationId);

export const getConversations = (convObj) =>
  clientAPI.post("/messages/getConversations", convObj);
