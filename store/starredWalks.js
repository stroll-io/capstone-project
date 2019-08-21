import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_STARRED_WALKS = 'GET_STARRED_WALKS';

const getStarredWalks = starredWalks => {
  return {
    type: GET_STARRED_WALKS,
    starredWalks,
  };
};

export default function starredWalksReducer(starredState = [], action) {
  switch (action.type) {
    case GET_STARRED_WALKS:
      return action.starredWalks;
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
