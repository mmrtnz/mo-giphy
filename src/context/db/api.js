// Local Dependencies
import {
  DB_GET_FAILURE,
  DB_GET_SUCCESS,
  DB_GET_REQUEST,
  DB_POST_FAILURE,
  DB_POST_SUCCESS,
  DB_POST_REQUEST,
} from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

// Action Definitions
export const getDb = async (dispatch, endpoint, body, onSuccess, errorMessagesByCode) => {
  const url = `${baseURL}${endpoint}`;

  dispatch({ type: DB_GET_REQUEST });

  try {
    const data = await fetch(url, body);

    if (data.status !== 200) {
      const errorMessage = errorMessagesByCode[data.status];

      dispatch({
        type: DB_GET_FAILURE,
        payload: errorMessage,
      });

      return;
    }

    const dataJSON = await data.json();

    dispatch({
      type: DB_GET_SUCCESS,
      payload: dataJSON,
    });

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log('Unxpected error when getting from database: ', e);
    dispatch({
      type: DB_GET_FAILURE,
      payload: 'An error occured, please try again later',
    });
  }
};

export const postDb = async (dispatch, endpoint, body, onSuccess, errorMessagesByCode) => {
  const url = `${baseURL}${endpoint}`;

  dispatch({ type: DB_POST_REQUEST });

  try {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (data.status !== 200) {
      const errorMessage = errorMessagesByCode[data.status];

      dispatch({
        type: DB_POST_FAILURE,
        payload: errorMessage,
      });

      return;
    }

    const dataJSON = await data.json();

    dispatch({
      type: DB_POST_SUCCESS,
      payload: dataJSON,
    });

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log('Unexpected error when posting to database: ', e);
    dispatch({
      type: DB_POST_FAILURE,
      payload: 'An error occured, please try again later',
    });
  }
};
