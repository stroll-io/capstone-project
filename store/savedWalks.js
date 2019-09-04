import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_SAVED_WALKS = 'GET_SAVED_WALKS';
const ADD_SAVED_WALK = 'ADD_SAVED_WALK';
const REMOVE_SAVED_WALK = 'REMOVE_SAVED_WALK';

const getSavedWalks = savedWalks => {
  return {
    type: GET_SAVED_WALKS,
    savedWalks,
  };
};

const addSavedWalk = walk => {
  return {
    type: ADD_SAVED_WALK,
    walk,
  };
};

const removeSavedWalk = walkId => {
  return {
    type: REMOVE_SAVED_WALK,
    walkId,
  };
};

export default function savedWalksReducer(savedState = [], action) {
  switch (action.type) {
    case GET_SAVED_WALKS:
      return action.savedWalks;
    case ADD_SAVED_WALK:
      if (
        savedState.find(aWalk => {
          return aWalk.id === action.walk.id;
        })
      ) {
        return [...savedState];
      } else {
        return [...savedState, action.walk];
      }
    case REMOVE_SAVED_WALK:
      return savedState.filter(walk => walk.id !== action.walkId);
    default:
      return savedState;
  }
}

export const fetchSavedWalks = userId => {
  return async dispatch => {
    const { data } = await axios.get(`${ngrokSecret}/api/savedWalks/${userId}`);
    dispatch(getSavedWalks(data));
  };
};

export const addSavedWalkThunk = (userId, walkId) => {
  return async dispatch => {
    const { data } = await axios.post(
      `${ngrokSecret}/api/savedWalks/${userId}/${walkId}`
    );
    dispatch(addSavedWalk(data));

    // return previous;
  };
};

export const removeSavedWalkThunk = (userId, walkId) => {
  return async dispatch => {
    await axios.delete(`${ngrokSecret}/api/savedWalks/${userId}/${walkId}`);
    dispatch(removeSavedWalk(walkId));
  };
};
