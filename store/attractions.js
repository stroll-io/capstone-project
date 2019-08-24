import axios from 'axios';
import { ngrokSecret } from '../secrets';

const GET_ATTRACTIONS = 'GET_ATTRACTIONS';
const GET_ATTRACTIONS_BY_TAG = 'GET_ATTRACTIONS_BY_TAG';

const getAttractions = attractions => ({
  type: GET_ATTRACTIONS,
  attractions,
});

const getAttractionsByTag = attractions => ({
  type: GET_ATTRACTIONS_BY_TAG,
  attractions,
});

export const getAllAttractionsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get(`${ngrokSecret}/api/attractions/`);
    dispatch(getAttractions(data));
  } catch (err) {
    console.error(err);
  }
};

export const getAttractionsByTagThunk = tag => async dispatch => {
  try {
    const res = await axios.get(`${ngrokSecret}/api/attractions/tags/${tag}`);
    dispatch(getAttractionsByTag(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const getAttractionsThunk = walkId => async dispatch => {
  try {
    const { data } = await axios.get(
      `${ngrokSecret}/api/attractions/${walkId}`
    );
    dispatch(getAttractions(data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_ATTRACTIONS:
      return action.attractions;
    case GET_ATTRACTIONS_BY_TAG:
      return action.attractions;
    default:
      return state;
  }
}
