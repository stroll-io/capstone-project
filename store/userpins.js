import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_ALL_PINS = 'GET_ALL_PINS';
const ADD_PIN = 'ADD_PIN'

const getAllPins = pins => ({
  type: GET_ALL_PINS,
  pins,
});

const addPin = (pin) => ({
  type: ADD_PIN,
  pin
})



export const getAllPinsThunk = () => async dispatch => {
  try {
    const res = await axios.get(`${ngrokSecret}/api/userPins/`);
    dispatch(getAllPins(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addPinThunk = (pin) => async dispatch => {
  try {
    const res = await axios.post(`${ngrokSecret}/api/userPins`, pin)
    dispatch(addPin(res.data))
  } catch(err) {
    console.error(err)
  }
}



const defaultState = [];

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_PINS:
      return action.pins;
    case ADD_PIN:
      return [...state, action.pin]
    default:
      return state;
  }
}
