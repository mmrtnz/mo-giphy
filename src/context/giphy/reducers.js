// Local Dependencies
import {
  GIPHY_GET_REQUEST,
  GIPHY_GET_REQUEST_SINGLE,
  GIPHY_GET_SUCCESS,
  GIPHY_GET_SUCCESS_SINGLE,
} from './action-types';

// Seperate data from multiple vs single gifs
export default (state, action) => {
  switch (action.type) {
    case GIPHY_GET_REQUEST:
      console.log('GIPHY_GET_REQUEST');
      return {
        ...state,
        feed: {
          ...state.feed,
          isGetting: true,
        },
      };
    case GIPHY_GET_SUCCESS:
      console.log('GIPHY_GET_SUCCESS');
      return {
        ...state,
        feed: {
          apiData: action.payload,
          error: null,
          isGetting: false,
        },
      };
    case GIPHY_GET_REQUEST_SINGLE:
      console.log('GIPHY_GET_REQUEST_SINGLE');
      return {
        ...state,
        single: {
          ...state.feed,
          isGetting: true,
        },
      };
    case GIPHY_GET_SUCCESS_SINGLE:
      console.log('GIPHY_GET_SUCCESS_SINGLE');
      return {
        ...state,
        single: {
          apiData: action.payload,
          error: null,
          isGetting: false,
        },
      };
    default:
      return state;
  }
};
