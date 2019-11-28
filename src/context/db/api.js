// Local Dependencies
import {
  DB_POST_FAILURE,
  DB_POST_REQUEST,
} from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

// Action Definitions
export const postDb = async (dispatch, endpoint, body, onData, errorMessage) => {
  const url = `${baseURL}${endpoint}`;

  dispatch({ type: DB_POST_REQUEST });

  try {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
     });
     onData(data);
  } catch (e) {
    console.log('Unxpected error when posting to database: ', e);
    dispatch({
      type: DB_POST_FAILURE,
      payload: errorMessage,
    });
  }
};
