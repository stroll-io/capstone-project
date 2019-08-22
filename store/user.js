import axios from 'axios';
import { ngrokSecret } from '../secrets';

const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const SET_USER = 'SET_USER';

const createUser = user => {
  return {
    type: CREATE_USER,
    user,
  };
};

const updateUser = updatedUser => {
  return {
    type: UPDATE_USER,
    updatedUser,
  };
};

const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

const defaultUser = {};

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

export const fetchUpdatedUser = (userId, name, email) => {
  return async dispatch => {
    const { data } = await axios.put(`${ngrokSecret}/api/users/${userId}`, {
      name,
      email,
    });
    dispatch(updateUser(data));
  };
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.updatedUser;
    default:
      return state;
  }
}
