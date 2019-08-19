import axios from 'axios';
import ngrok from '../secrets';

const SET_ACTIVE_WALK = 'SET_ACTIVE_WALK';

const setActiveWalk = (walk) => ({
  type: SET_ACTIVE_WALK,
  walk
})

export const setActiveWalkThunk = () => async dispatch => {
  try {
    //make an api route for axios to get a walk by id
    //dispatch the thunk with res.data
  }
  catch (err) {
    console.error(err)
  }
}
const defaultState = {}
export default function(state = defaultState, action) {

}
