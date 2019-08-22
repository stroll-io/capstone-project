import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER';
const UPDATE_LOGGEDIN_USER = 'UPDATE_LOGGEDIN_USER';

const getLoggedInUser = loggedInUser => {
  return {
    type: GET_LOGGEDIN_USER,
    loggedInUser,
  };
};

const updateLoggedInUser = updatedUser => {
  return {
    type: UPDATE_LOGGEDIN_USER,
    updatedUser,
  };
};

const defaultUser = {};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_LOGGEDIN_USER:
      return action.loggedInUser;
    case UPDATE_LOGGEDIN_USER:
      return action.updatedUser;
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

export const fetchUpdatedUser = userId => {
  return async dispatch => {
    const { data } = await axios.put(`${ngrokSecret}/api/users/${userId}`);
    dispatch(updateLoggedInUser(data));
  };
};
