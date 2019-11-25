// Local Dependencies
import {
  DB_GET_REQUEST,
  DB_GET_SUCCESS,
  DB_GET_FAILURE,
  DB_POST_REQUEST,
  DB_POST_SUCCESS,
  DB_POST_FAILURE,
} from './action-types';

// Seperate data from multiple vs single gifs
export default (state, action) => {
  switch (action.type) {
    case DB_GET_REQUEST:
      return {
        ...state,
        isGetting: true,
      };
    case DB_GET_SUCCESS:
      return {
        ...state,
        apiData: action.payload,
        error: null,
        isGetting: false,
      };
    case DB_GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        isGetting: false,
      };
    case DB_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isPosting: false,
      };
    case DB_POST_REQUEST:
      return {
        ...state,
        isPosting: true,
      };
    case DB_POST_SUCCESS:
      return {
        ...state,
        apiData: action.payload,
        error: null,
        isPosting: false,
      };
    default:
      return state;
  }
};
