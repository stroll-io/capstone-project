import axios from 'axios';
import ngrok from '../secrets'

const GET_ALL_PINS = 'GET_ALL_PINS';

const getAllPins = (pins) => ({
  type: GET_ALL_PINS,
  pins
});

export const getAllPinsThunk = () => async dispatch => {
  try {
    const res = await axios.get(`${ngrok}/api/userPins/`);
    dispatch(getAllPins(res.data));
  }
  catch (err) {
    console.error(err);
  }
};

const defaultState = [];

export default function(state = defaultState, action) {

  switch(action.type) {
    case GET_ALL_PINS:
      return action.pins;
    default:
      return state;
  }
}
