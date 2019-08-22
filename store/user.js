import axios from 'axios';
import { ngrokSecret } from '../secrets';

const defaultUser = {};

const CREATE_USER = 'CREATE_USER';
const SET_USER = 'SET_USER';
// const BAD_LOGIN = 'BAD_LOGIN';
// const GET_LOGGEDIN_USER = 'GET_LOGGEDIN_USER';

const createUser = user => {
  return {
    type: CREATE_USER,
    user,
  };
};

const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

// const badLogin = error => {
//   return { type: BAD_LOGIN, error };
// };

// const getLoggedInUser = loggedInUser => {
//   return {
//     type: GET_LOGGEDIN_USER,
//     loggedInUser,
//   };
// };

// export const fetchLoggedInUser = userId => {
//   return async dispatch => {
//     const { data } = await axios.get(`${ngrokSecret}/api/users/${userId}`);
//     dispatch(getLoggedInUser(data));
//   };
// };

export const createAccount = (firstName, email, password) => {
  return async dispatch => {
    const { data } = await axios.post(`${ngrokSecret}/auth/register`, {
      firstName,
      email,
      password,
    });
    dispatch(createUser(data));
  };
};

export const fetchUser = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`${ngrokSecret}/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(data));
    } catch (authError) {
      dispatch(setUser({ error: authError }));
      throw authError;
    }
  };
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case SET_USER:
      return action.user;
    // case GET_LOGGEDIN_USER:
    //   return action.loggedInUser;
    default:
      return state;
  }
}
