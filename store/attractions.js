import axios from 'axios';
import { ngrokSecret } from '../secrets'


const GET_ATTRACTIONS = 'GET_ATTRACTIONS';

const getAttractions = attractions => ({
  type: GET_ATTRACTIONS,
  attractions
})

export const getAttractionsThunk = (walkId) => async dispatch => {
  try {
    const { data } = await axios.get(`${ngrokSecret}/api/attractions/${walkId}`)
    dispatch(getAttractions(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [],action) {
  switch(action.type) {
    case GET_ATTRACTIONS:
      return action.attractions
    default:
      return state;
  }
}
