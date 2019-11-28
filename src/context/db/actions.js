// External Dependencies
import { Base64 } from 'js-base64';

// Local Dependencies
import {
  getDb,
  postDb,
} from './api';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

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

// Action Definitions
const queryDbLogin = async (dispatch, username, password, onSuccess = null) => {
  const endpoint = '/login';
  const credentials = `${username}:${password}`;
  const body = {
    headers: {
      Authorization: `Basic ${Base64.encode(credentials)}`,
    },
  };
  const errorMessagesByCode = {
    401: 'Invalid username or password',
    500: 'There was a problem logging into your account. Please try again later.',
  };

  getDb(dispatch, endpoint, body, onSuccess, errorMessagesByCode);
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

const saveAccountGif = async (dispatch, accountId, gifData) => {
  const endpoint = `/account/${accountId}/gif`;
  const body = {
    giphyData: getMinimumGifData(gifData),
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

const getAccount = async (dispatch, accountId) => {
  console.log('hellooooo');
  const endpoint = `/account/${accountId}`;
  const errorMessagesByCode = {
    500: 'There was a getting your account data. Please try again later.',
  };

  getDb(dispatch, endpoint, {}, null, errorMessagesByCode);
};

export {
  deleteAccountGif,
  getAccount,
  queryDbLogin,
  saveSignUp,
  saveAccountGif,
};
