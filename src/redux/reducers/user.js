import { SET_USER, CLEAR_USER } from "../actions/types";
const initialUserState = {
  currentUser: null,
  isLoading: true
};

export default (state = initialUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        currentUser: payload.currentUser,
        isLoading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
