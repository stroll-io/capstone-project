import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_STARRED_WALKS = 'GET_STARRED_WALKS';
const ADD_STARRED_WALK = 'ADD_STARRED_WALK';

const getStarredWalks = starredWalks => {
  return {
    type: GET_STARRED_WALKS,
    starredWalks,
  };
};

const addStarredWalk = (walk) => {
  return {
    type: ADD_STARRED_WALK,
    walk
  }
}

export default function starredWalksReducer(starredState = [], action) {
  switch (action.type) {
    case GET_STARRED_WALKS:
      return action.starredWalks;
    case ADD_STARRED_WALK:
      return [...starredState, action.walk]
    default:
      return starredState;
  }
}

export const fetchStarredWalks = userId => {
  return async dispatch => {
    const { data } = await axios.get(
      `${ngrokSecret}/api/users/${userId}/starred-walks`
    );
    dispatch(getStarredWalks(data));
  };
};

export const addStarredWalkThunk = (userId, walkId) => {
  return async dispatch => {
    const { data } = await axios.post(`${ngrokSecret}/api/favorites/${userId}/${walkId}`);
  }
  dispatch(addStarredWalk(data))
}
