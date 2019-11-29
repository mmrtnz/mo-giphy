// Local Dependencies
import {
  DB_GET_REQUEST_ACCOUNT,
  DB_GET_SUCCESS_ACCOUNT,
  DB_GET_SUCCESS_NO_DATA_ACCOUNT,
  DB_GET_FAILURE_ACCOUNT,
  DB_POST_FAILURE_ACCOUNT,
  DB_POST_REQUEST_ACCOUNT,
  DB_POST_SUCCESS_ACCOUNT,
  DB_POST_SUCCESS_NO_DATA_ACCOUNT,
  DB_GET_REQUEST_GIFS,
  DB_GET_SUCCESS_GIFS,
  DB_GET_FAILURE_GIFS,
} from './action-types';

export default (state, action) => {
  switch (action.type) {
    case DB_GET_REQUEST_ACCOUNT:
      return {
        ...state,
        account: {
          isGetting: true,
        },
      };
    case DB_GET_SUCCESS_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          apiData: action.payload,
          error: null,
          isGetting: false,
        },
      };
    case DB_GET_SUCCESS_NO_DATA_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          error: null,
          isGetting: false,
        },
      };
    case DB_GET_FAILURE_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          error: action.payload,
          isGetting: false,
        },
      };
    case DB_POST_FAILURE_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          error: action.payload,
          isPosting: false,
        },
      };
    case DB_POST_REQUEST_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          isPosting: true,
        },
      };
    case DB_POST_SUCCESS_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          apiData: action.payload,
          error: null,
          isPosting: false,
        },
      };
    case DB_POST_SUCCESS_NO_DATA_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          error: null,
          isGetting: false,
        },
      };
    case DB_GET_REQUEST_GIFS:
      return {
        ...state,
        gifs: {
          ...state.gifs,
          isGetting: true,
        },
      };
    case DB_GET_SUCCESS_GIFS:
      return {
        ...state,
        gifs: {
          ...state.gifs,
          apiData: action.payload,
          error: null,
          isGetting: false,
        },
      };
    case DB_GET_FAILURE_GIFS:
      return {
        ...state,
        gifs: {
          ...state.gifs,
          error: action.payload,
          isGetting: false,
        },
      };
    default:
      return state;
  }
};
