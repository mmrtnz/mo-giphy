// Local Variables
const protocol = 'http';
const baseURL = `${protocol}://localhost:3001`;

const queryDb = async () => {
  try {
    console.log('fetchin');
    const data = await fetch(baseURL);
    // const dataJSON = await data.json();
    console.log('data', data);
  } catch (e) {
    console.log('Error calling fetch for database:', e);
  }
};

export {
  queryDb,
};
