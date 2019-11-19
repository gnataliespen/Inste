import Cookies from "js-cookie";
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  CLEAR_USER,
  AUTH_ERROR,
  LOGOUT
} from "../actions/types";

const initialUserState = {
  currentUser: null,
  loading: true,
  isAuth: false
};

export default (state = initialUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        currentUser: payload,
        isAuth: true,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
        loading: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      Cookies.set("token", payload, { expires: 7 });
      return {
        ...state,
        token: payload
      };
    case AUTH_ERROR:
    case LOGOUT:
      Cookies.remove("token");
      console.log("hey");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        currentUser: null
      };
    default:
      return state;
  }
};
