import axios from 'axios';
import ngrok from "../secrets";

const GET_ALL_WALKS = "GET_ALL_WALKS";

const getAllWalks = (walks) => ({
  type: GET_ALL_WALKS,
  walks
});

export const getAllWalksThunk = () => async dispatch => {
  try {
    const res = await axios.get(`${ngrok}/api/walks`);
    dispatch(getAllWalks(res.data));
  }
  catch(err) {
    console.error(err);
  }
};

const defaultState = [];

export default function(state = defaultState, action) {
  switch(action.type) {
    case GET_ALL_WALKS:
      return action.walks;
    default:
      return state;
  }
}
