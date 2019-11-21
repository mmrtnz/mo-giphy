const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());

const port = process.env.REACT_APP_DB_PORT || 3001;
const router = express.Router();

router.get('/', (req, res) => {
  console.log('req', req.body);
  res.send('Hello World!');
});

app.use('/', router);

app.listen(port, () => {
  console.log('Running on port', port);
});
