import { createContext, useReducer, useState } from "react";
import authReducer, { authState } from "./authReducer.js";
import {
  login,
  signup,
  validateToken,
  getProfile,
  editProfile,
} from "../../utils/axios-utils.js";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(authState);
// added
let userInfo = {};
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(authReducer, authState);
  const [authToggle,setAuthToggle] = useState({login:false, signUp: false})

  async function signUp(FormData) {
    try {
      const response = await signup(FormData);
      dispatch({ type: "AUTH_SIGNUP", payload: response.data });
      const userStorage = {
        username: response.data.user.username,
        id: response.data.user.id,
        token: response.data.token,
        imgProfile: response.data.user.imgProfile,
      };
      localStorage.setItem("user", JSON.stringify(userStorage));
      setAuthToggle({signUp:true, login:false})
      navigate("/germany");
      return response;
    } catch (err) {
      dispatch({ type: "SIGNIN_ERR", payload: err.message });
    }
  }
  async function logIn(FormData) {
    try {
      const response = await login(FormData);
      dispatch({ type: "AUTH_SIGNIN", payload: response.data });

      const userStorage = {
        username: response.data.user.username,
        id: response.data.user.id,
        token: response.data.token,
        imgProfile: response.data.user.imgProfile,
      };
      localStorage.setItem("user", JSON.stringify(userStorage));

      userInfo = response.data.user;
      setAuthToggle({login:true, signUp:false})
      navigate("/germany");
      return response;
    } catch (err) {
      dispatch({ type: "SIGNIN_ERR", payload: err.message });
    }
  }
  async function tokenValidator() {
    try {
      const response = await validateToken();
      if (response.data.message) {
        dispatch({ type: "SIGN_OUT" });
        localStorage.removeItem("user");
        navigate("/")
      } else {
        dispatch({
          type: "AUTH_VALID",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getProfileInfo(userId) {
    try {
      const response = await getProfile(userId);
      dispatch({ type: "USER_INFO", payload: response.data[0] });
    } catch (err) {
      console.log(err);
    }
  }

  async function editUserProfile(FormData) {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const newId = user.id;
      try {
        editProfile(FormData, newId);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function signOut() {
    dispatch({ type: "SIGN_OUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("goalpoint");
    localStorage.removeItem("position");
    setAuthToggle(false)
    navigate("/")
  }
  const resetError = () => {
    dispatch({ type: "CLR_ERR" });
  };
  console.log(state)
  const value = {
    logIn,
    signUp,
    signOut,
    isAuthenticated: state.isAuthenticated,
    tokenValidator,
    getProfileInfo,
    state,
    userInfo: state.userInfo,
    editUserProfile,
    resetError,
    authToggle, setAuthToggle,
    loginError: state.loginError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
