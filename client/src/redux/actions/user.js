import Cookies from "js-cookie";

import api from "../../util/apiConnection";
import setAuthToken from "../../util/setAuthToken";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_USER,
  AUTH_ERROR
} from "./types";

//Load User
export const loadUser = () => async dispatch => {
  const token = Cookies.get("token");
  if (token) {
    setAuthToken(token);
  }
  console.log(token);
  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

//Register User
export const register = userObj => async dispatch => {
  dispatch(clearUser());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(userObj);

  try {
    const res = await api.post("/auth/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};

//Login User
export const loginUser = ({ email, password }) => async dispatch => {
  dispatch(clearUser());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post("/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};
//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
//Clear user state
export const clearUser = () => dispatch => {
  dispatch({ type: CLEAR_USER });
};
