import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_ALL_WALKS = 'GET_ALL_WALKS';
const GET_WALKS_BY_TAG = 'GET_WALKS_BY_TAG';

const getAllWalks = walks => ({
  type: GET_ALL_WALKS,
  walks,
});

const getWalksByTag = walks => ({
  type: GET_WALKS_BY_TAG,
  walks,
})

/*
  Consider more conscious naming of thunk creators/actions.
  
  Here the name of the thunk creator is paired with the name of the corresponding action.
  
  consider:
  
  `getAllWalksThunk' and `GOT_WALKS` (or `SET_WALKS`).
*/

export const getAllWalksThunk = () => async dispatch => {
  try {
    const res = await axios.get(`${ngrokSecret}/api/walks`);
    dispatch(getAllWalks(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const getWalksByTagThunk = (tag) => async dispatch => {
  try {
    const res = await axios.get(`${ngrokSecret}/api/walks/tags/${tag}`)
    dispatch(getWalksByTag(res.data))
  } catch(err) {
    console.error(err)
  }
}

const defaultState = [];

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_WALKS:
      return action.walks;
    case GET_WALKS_BY_TAG:
      return action.walks;
    default:
      return state;
  }
}
