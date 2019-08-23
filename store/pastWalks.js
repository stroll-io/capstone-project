import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_PAST_WALKS = 'GET_PAST_WALKS';
const ADD_PAST_WALK = 'ADD_PAST_WALK'

const getPastWalks = allpastWalks => {
  return {
    type: GET_PAST_WALKS,
    allpastWalks,
  };
};

const addPastWalk = walk => {
  return {
    type: ADD_PAST_WALK,
    walk
  }
}

export default function pastWalkReducer(pastWalkState = [], action) {
  switch (action.type) {
    case GET_PAST_WALKS:
      return action.allpastWalks;
    case ADD_PAST_WALK:
      return action.walk;
    default:
      return pastWalkState;
  }
}

export const fetchAllPastWalks = userId => {
  return async dispatch => {
    const { data } = await axios.get(
      `${ngrokSecret}/api/users/${userId}/past-walks`
    );
    dispatch(getPastWalks(data));
  };
};

export const addPastWalkThunk = (userId, walkId) => {
  return async dispatch => {
    const { data } = await axios.post(`${ngrokSecret}/api/pastWalks/${userId}/${walkId}`);
    dispatch(addPastWalk(data))
  }
}
