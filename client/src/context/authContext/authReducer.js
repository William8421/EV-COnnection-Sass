export const authState = {
    isAuthenticated: false,
    userInfo: {},
    error: false,
    loginError: true,
    imgProfile: {}
  };

  const authReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AUTH_SIGNIN": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload.user,
        };
      }
      case "SIGN_OUT": {
        return {
          ...state,
          isAuthenticated: false,
          user: {},
        };
      }
      case "AUTH_SIGNUP": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
          
        };
      }
      case "SIGNIN_ERR": {
        return {
          ...state,
          error: payload,
          loginError: true
        };
      }
      case "AUTH_VALID": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
        };
      }
  
      case "CLR_ERR": {
        return {
          ...state,
          error: false,
          loginError: false
        };
      }
  case "USER_INFO": {
    return {
      ...state,
      userInfo: payload
    }
  }
 
      default: {
        return state;
      }
    }
  };
  export default authReducer;