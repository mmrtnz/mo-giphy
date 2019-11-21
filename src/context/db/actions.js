// External Dependencies
import { Base64 } from 'js-base64';

// Local Dependencies
import {
  DB_GET_FAILURE,
  DB_GET_REQUEST,
  DB_GET_SUCCESS,
} from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

const queryDbLogin = async (username, password, dispatch) => {
  const url = `${baseURL}/login`;
  const credentials = `${username}:${password}`;
  const headers = {
    Authorization: `Basic ${Base64.encode(credentials)}`,
  };

  dispatch({ type: DB_GET_REQUEST });

  try {
    const data = await fetch(url, { headers });

    if (data.status === 401) {
      dispatch({
        type: DB_GET_FAILURE,
        payload: 'Invalid username or password',
      });
      return;
    }

    const dataJSON = await data.json();

    dispatch({
      type: DB_GET_SUCCESS,
      payload: dataJSON,
    });
  } catch (e) {
    console.log('Unxpected error when logging in: ', e);
    dispatch({
      type: DB_GET_FAILURE,
      payload: 'There was a problem logging into your account. Please try again later.',
    });
  }
};

const queryDbSignUp = async (username, password, dispatch) => {
  const url = `${baseURL}/signup`;

  dispatch({ type: DB_GET_REQUEST });

  try {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: Base64.encode(username),
        password: Base64.encode(password),
      }),
      headers: { 'Content-Type': 'application/json' },
     });

    if (data.status === 401) {
      dispatch({
        type: DB_GET_FAILURE,
        payload: 'Username already exists',
      });
      return;
    }

    const dataJSON = await data.json();

    dispatch({
      type: DB_GET_SUCCESS,
      payload: dataJSON,
    });
  } catch (e) {
    console.log('Unxpected error when signing up: ', e);
    dispatch({
      type: DB_GET_FAILURE,
      payload: 'There was a problem signing up. Please try again later.',
    });
  }
};

export {
  queryDbLogin,
  queryDbSignUp,
};
