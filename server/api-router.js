// External Dependencies
const express = require('express');
const { Base64 } = require('js-base64');

// Internal Dependencies
const { Account } = require('./models');

const router = express.Router();

const handleLogin = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).send('No authorization found');
    return;
  }

  // Remove 'Basic ' from authorization before decoding
  const [username, password] = Base64.decode(authorization.substring(6)).split(':');

  if (!username || !password) {
    res.status(400).send('Invalid username or password');
    return;
  }

  Account.find({
    username,
    password: Base64.encode(password),
  }).exec((err, accounts) => {
    if (accounts.length) {
      // TODO: query for more account info
      res.json({ username: accounts[0].username }).end();
    } else {
      res.status(401).end();
    }
  });
};

const handleSignUp = (req, res) => {
  const {
    password,
    username,
  } = req.body;

  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }

  // Keep password encoded in db
  const decodedUsername = Base64.decode(username);
  const account = new Account({
    username: decodedUsername,
    password,
  });

  // Add new accoutn to db
  account.save((err) => {
    if (err) {
      res.status(500).end();
    }
  });

  // Check if the username is taken
  Account.find({ username: decodedUsername }).exec((err, accounts) => {
    if (accounts.length) {
      res.status(403).end();
    } else {
      // TODO: query for more account info
      res.json({ username: account.username }).end();
    }
  });
};

router.get('/api/login', handleLogin);
router.post('/api/signup', handleSignUp);

module.exports = router;
