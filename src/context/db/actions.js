// External Dependencies
import { Base64 } from 'js-base64';

// Local Dependencies
import {
  DB_GET_FAILURE,
  DB_GET_REQUEST,
  DB_GET_SUCCESS,
  DB_POST_FAILURE,
  DB_POST_REQUEST,
  DB_POST_SUCCESS,
} from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

// Action Definitions
const postDb = async (dispatch, url, body, onData, errorMessage) => {
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

const queryDbLogin = async (dispatch, username, password, onSuccess = null) => {
  const url = `${baseURL}/login`;
  const credentials = `${username}:${password}`;
  const headers = {
    Authorization: `Basic ${Base64.encode(credentials)}`,
  };

  dispatch({ type: DB_POST_REQUEST });

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
      type: DB_POST_SUCCESS,
      payload: dataJSON,
    });

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log('Unxpected error when logging in: ', e);
    dispatch({
      type: DB_GET_FAILURE,
      payload: 'There was a problem logging into your account. Please try again later.',
    });
  }
};

const saveSignUp = async (dispatch, username, password, onSuccess = null) => {
  const url = `${baseURL}/signup`;
  const body = {
    username: Base64.encode(username),
    password: Base64.encode(password),
  };
  const errorMessage = 'There was a problem signing up. Please try again later.';

  postDb(dispatch, url, body, async (data) => {
    if (data.status === 403) {
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

    if (onSuccess) {
      onSuccess();
    }
  }, errorMessage);
};

// Only extracts data to be stored in our DB
const getMinimumGifData = ({
  id,
  images: {
    // eslint-disable-next-line camelcase
    fixed_width,
    original,
  },
  title,
}) => ({
  id,
  images: {
    fixedWidth: {
      height: fixed_width.height,
      webp: fixed_width.webp,
      width: fixed_width.width,
    },
    original: {
      height: original.height,
      webp: original.webp,
      width: original.width,
    },
  },
  title,
});


const saveAccountGif = async (dispatch, accountId, gifData, tags) => {
  const url = `${baseURL}/account/${accountId}/gif`;
  const body = {
    giphyData: getMinimumGifData(gifData),
    tags,
  };
  const errorMessage = 'There was an error saving changes to your gif.';

  postDb(dispatch, url, body, () => {
    console.log('saveAccountGif onData');
    dispatch({
      type: DB_POST_SUCCESS,
      payload: {},
    });
  }, errorMessage);
};

export {
  queryDbLogin,
  saveSignUp,
  saveAccountGif,
};
