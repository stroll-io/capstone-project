import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER';

const getLoggedInUser = loggedInUser => {
  return {
    type: GET_LOGGEDIN_USER,
    loggedInUser,
  };
};

const defaultUser = {};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_LOGGEDIN_USER:
      return action.loggedInUser;
    default:
      return state;
  }
}

export const fetchLoggedInUser = userId => {
  return async dispatch => {
    const { data } = await axios.get(`${ngrokSecret}/api/users/${userId}`);
    dispatch(getLoggedInUser(data));
  };
};
