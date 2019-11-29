// Local Dependencies
import * as actionTypes from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

// Action Definitions
export const getDb = async (dispatch, endpoint, body, actionContext, onSuccess, errorMessagesByCode) => {
  const url = `${baseURL}${endpoint}`;

  dispatch({ type: actionTypes[`DB_GET_REQUEST_${actionContext}`] });

  try {
    const data = await fetch(url, body);

    if (data.status !== 200) {
      const errorMessage = errorMessagesByCode[data.status];

      dispatch({
        type: actionTypes[`DB_GET_FAILURE_${actionContext}`],
        payload: errorMessage,
      });

      return;
    }

    try {
      const dataJSON = await data.json();
      dispatch({
        type: actionTypes[`DB_GET_SUCCESS_${actionContext}`],
        payload: dataJSON,
      });
    } catch {
      dispatch({
        type: actionTypes[`DB_GET_SUCCESS_NO_DATA_${actionContext}`],
      });
    }

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log('Unxpected error when getting from database: ', e);
    dispatch({
      type: actionTypes[`DB_GET_FAILURE_${actionContext}`],
      payload: 'An error occured, please try again later',
    });
  }
};

export const postDb = async (dispatch, endpoint, body, actionContext, onSuccess, errorMessagesByCode) => {
  const url = `${baseURL}${endpoint}`;

  dispatch({ type: actionTypes[`DB_POST_REQUEST_${actionContext}`] });

  try {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (data.status !== 200) {
      const errorMessage = errorMessagesByCode[data.status];

      dispatch({
        type: actionTypes[`DB_POST_FAILURE_${actionContext}`],
        payload: errorMessage,
      });

      return;
    }

    try {
      const dataJSON = await data.json();
      dispatch({
        type: actionTypes[`DB_POST_SUCCESS_${actionContext}`],
        payload: dataJSON,
      });
    } catch {
      dispatch({
        type: actionTypes[`DB_POST_SUCCESS_NO_DATA_${actionContext}`],
      });
    }

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log('Unexpected error when posting to database: ', e);
    dispatch({
      type: actionTypes[`DB_POST_FAILURE_${actionContext}`],
      payload: 'An error occured, please try again later',
    });
  }
};
