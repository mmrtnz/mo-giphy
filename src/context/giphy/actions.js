// Local Dependencies
import {
  GIPHY_GET_REQUEST,
  GIPHY_GET_REQUEST_SINGLE,
  GIPHY_GET_SUCCESS,
  GIPHY_GET_SUCCESS_SINGLE,
} from './action-types';

// Local Variables
const protocol = 'https';
const baseURL = `${protocol}://api.giphy.com/v1/gifs`;

const queryGiphy = async (url, dispatch, actionTypeRequest, actionTypeSuccess) => {
  // Update isGetting state to avoid extra API calls
  dispatch({
    type: actionTypeRequest,
  });

  try {
    const data = await fetch(url);
    const dataJSON = await data.json();
    dispatch({
      type: actionTypeSuccess,
      payload: dataJSON,
    });
  } catch (e) {
    console.log(`Error calling fetch for action ${actionTypeSuccess}:`, e);
  }
};

const queryGiphyBySearch = async (q, dispatch) => {
  const apiKey = process.env.REACT_APP_GIPHY_KEY;
  const url = `${baseURL}/search?api_key=${apiKey}&q=${q}`;
  queryGiphy(url, dispatch, GIPHY_GET_REQUEST, GIPHY_GET_SUCCESS);
};

const queryGiphyById = async (id, dispatch) => {
  const apiKey = process.env.REACT_APP_GIPHY_KEY;
  const url = `${baseURL}/${id}?api_key=${apiKey}`;
  queryGiphy(url, dispatch, GIPHY_GET_REQUEST_SINGLE, GIPHY_GET_SUCCESS_SINGLE);
};

export {
  queryGiphyById,
  queryGiphyBySearch,
};
