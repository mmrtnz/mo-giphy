require('dotenv').config();

// External Dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Internal Dependencies
const { Account } = require('./models');

const app = express();

app.use(cors());

const port = process.env.DB_PORT || 3001;
const router = express.Router();

// Connecting to database
const uri = process.env.DB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

// const testUser = new Account({
//   username: 'testuser',
//   password: 'test1234',
// });

// testUser.save(e => console.log('error saving account model', e));

router.get('/', async (req, res) => {
  Account.find({}).exec((err, accounts) => {
    console.log('accounts', accounts);
  });
  res.send('Hello World!');
});

app.use('/', router);

app.listen(port, () => {
  console.log('Running on port', port);
});
