// External Dependencies
import https from 'https';

// Local Variables
const protocol = 'https';
const baseURL = 'api.giphy.com/v1/gifs/search';

export const queryGiphySearch = q => new Promise((resolve, reject) => {
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
          resolve(apiData);
        } catch (e) {
          reject(e);
        }
      })
      .on('error', (err) => {
        reject(err);
      });
  });
});

export default queryGiphySearch;
