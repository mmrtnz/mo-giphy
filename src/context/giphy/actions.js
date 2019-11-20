// External Dependencies
import https from 'https';

// Local Dependencies
import { GIPHY_GET_SUCCESS } from './action-types';

// Local Variables
const protocol = 'https';
const baseURL = 'api.giphy.com/v1/gifs/search';

// TODO use fetch
export const queryGiphySearch = (q, dispatch) => new Promise((resolve, reject) => {
  const apiKey = process.env.REACT_APP_GIPHY_KEY;
  const url = `${protocol}://${baseURL}?api_key=${apiKey}&q=${q}`;

  https.get(url, (res) => {
    let rawData = '';
    res
      .on('data', (chunk) => {
        rawData += chunk;
      })
      .on('end', () => {
        try {
          const apiData = JSON.parse(rawData);

          dispatch({
            type: GIPHY_GET_SUCCESS,
            payload: apiData,
          });

          resolve(apiData);
        } catch (e) {
          console.log('Error after parsing response data: ', e);
          reject(e);
        }
      })
      .on('error', (err) => {
        console.log('Error from response: ', err);
        reject(err);
      });
  });
});

export default queryGiphySearch;
