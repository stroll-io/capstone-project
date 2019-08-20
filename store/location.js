import axios from 'axios';

const GET_LOCATION = "GET_LOCATION";

export const getLocation = location => ({
  type: GET_LOCATION,
  location
});




const defaultLocation = [41.895442, -87.638957];

export default function(state = defaultLocation, action) {
  switch(action.type) {
    case GET_LOCATION:
      return action.coords;
    default:
      return state;
  }
}
