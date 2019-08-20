import axios from 'axios';
import ngrok from '../secrets';

const SET_ACTIVE_WALK = 'SET_ACTIVE_WALK';

const setActiveWalk = (walk) => ({
  type: SET_ACTIVE_WALK,
  walk
})

export const setActiveWalkThunk = (id) => async dispatch => {
  try {
    const res = await axios.get(`${ngrok}/api/walks/${id}`);
    dispatch(setActiveWalk(res.data))
  }
  catch (err) {
    console.error(err)
  }
}

const defaultState = {};

export default function(state = defaultState, action) {
  switch(action.type) {
    case SET_ACTIVE_WALK:
      return action.walk;
    default:
      return state;
  }
}
