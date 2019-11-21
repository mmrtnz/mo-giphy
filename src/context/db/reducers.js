// Local Dependencies
import {
  DB_GET_REQUEST,
  DB_GET_SUCCESS,
} from './action-types';

// Seperate data from multiple vs single gifs
export default (state, action) => {
  console.log('action.type', action.type);
  switch (action.type) {
    case DB_GET_REQUEST:
      return {
        ...state,
        isGetting: true,
      };
    case DB_GET_SUCCESS:
      console.log('DB_GET_SUCCESS', action.payload);
      return {
        ...state,
        apiData: action.payload,
        error: null,
        isGetting: false,
      };
    default:
      return state;
  }
};
