require('dotenv').config();

// External Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Internal Dependencies
const apiRouter = require('./api-router');

// Local Variables
const app = express();
const port = process.env.DB_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Connect to database
const uri = process.env.DB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

app.use(apiRouter);

app.listen(port, () => {
  console.log('Running on port', port);
});
