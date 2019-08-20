import axios from 'axios';
import ngrokSecret from '../secrets';

const GET_PAST_WALKS = 'GET_PAST_WALKS';

const getPastWalks = allpastWalks => {
  return {
    type: GET_PAST_WALKS,
    allpastWalks,
  };
};

export default function pastWalkReducer(pastWalkState = [], action) {
  switch (action.type) {
    case GET_PAST_WALKS:
      return action.allpastWalks;
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
