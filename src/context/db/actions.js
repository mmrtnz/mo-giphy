// External Dependencies
import { Base64 } from 'js-base64';

// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001/api`;

const queryDbLogin = async (username, password) => {
  const url = `${baseURL}/login`;
  const credentials = `${username}:${password}`;
  const headers = {
    Authorization: `Basic ${Base64.encode(credentials)}`,
  };

  try {
    const data = await fetch(url, { headers });
    const dataJSON = await data.json();
    console.log('data', data);
    console.log('dataJSON', dataJSON);
  } catch (e) {
    console.log('Error calling fetch for database:', e);
  }
};

export {
  queryDbLogin,
};
