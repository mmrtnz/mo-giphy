// Local Dependencies
import * as actionTypes from './action-types';

export default (state, action, actionContext) => {
  switch (action.type) {
    case actionTypes[`DB_GET_REQUEST_${actionContext}`]:
      return {
        ...state,
        isGetting: true,
      };
    case actionTypes[`DB_GET_SUCCESS_${actionContext}`]:
      return {
        ...state,
        apiData: action.payload,
        error: null,
        isGetting: false,
      };
    case actionTypes[`DB_GET_FAILURE_${actionContext}`]:
      return {
        ...state,
        error: action.payload,
        isGetting: false,
      };
    case actionTypes[`DB_POST_FAILURE_${actionContext}`]:
      return {
        ...state,
        error: action.payload,
        isPosting: false,
      };
    case actionTypes[`DB_POST_REQUEST_${actionContext}`]:
      return {
        ...state,
        isPosting: true,
      };
    case actionTypes[`DB_POST_SUCCESS_${actionContext}`]:
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
