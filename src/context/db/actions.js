// External Dependencies
import { Base64 } from 'js-base64';

// Local Dependencies
import { postDb } from './api';
import {
  DB_GET_FAILURE,
  DB_GET_REQUEST,
  DB_GET_SUCCESS,
} from './action-types';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

// Action Definitions
const queryDbLogin = async (dispatch, username, password, onSuccess = null) => {
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
  const endpoint = '/signup';
  const body = {
    username: Base64.encode(username),
    password: Base64.encode(password),
  };

  const errorMessagesByCode = {
    403: 'Username already exists',
    500: 'There was a problem signing up. Please try again later.',
  };

  postDb(dispatch, endpoint, body, onSuccess, errorMessagesByCode);
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
  const endpoint = `/account/${accountId}/gif`;
  const body = {
    giphyData: getMinimumGifData(gifData),
    tags,
  };
  const errorMessagesByCode = {
    500: 'There was an error saving changes to your gif.',
  };

  postDb(dispatch, endpoint, body, null, errorMessagesByCode);
};

const deleteAccountGif = async (accountId, gifId) => {
  const url = `${baseURL}/account/${accountId}/gif/${gifId}`;
  const errorMessage = 'There was an error deleting this gif from your account.';

  try {
    const data = await fetch(url, {
      method: 'DELETE',
     });

    if (data.status !== 200) {
      throw new Error(errorMessage);
    }
  } catch (e) {
    console.log('Unxpected error when deleting from database: ', e);
  }
};

export {
  deleteAccountGif,
  queryDbLogin,
  saveSignUp,
  saveAccountGif,
};
