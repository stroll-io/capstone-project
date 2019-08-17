import axios from 'axios';
import { defaultCipherList } from 'constants';

const GET_LOCATION = "GET_LOCATION";

export const getLocation = location => ({
  type: GET_LOCATION,
  location
});




const defaultLocation = [41.895442, -87.638957];

export default function(state = defaultLocation, action) {
  switch(action.type) {
    default:
      return state;
  }
}
