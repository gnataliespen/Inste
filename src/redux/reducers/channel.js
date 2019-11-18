import {
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS
} from "../actions/types";

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

export default (state = initialChannelState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload
      };
    default:
      return state;
  }
};
