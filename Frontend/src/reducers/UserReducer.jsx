import { LOGIN, LOGOUT, SERVER_ERROR,CLEAR_ERROR } from "../components/action";
const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        serverError: "",
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SERVER_ERROR: {
      return {
        ...state,
        serverError: action.payload,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        serverError: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default UserReducer;
