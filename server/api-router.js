// External Dependencies
const express = require('express');
const { Base64 } = require('js-base64');

// Internal Dependencies
const { Account } = require('./models');

const router = express.Router();

router.get('/api/login', (req, res) => {
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
    password,
  }).exec((err, accounts) => {
    if (accounts.length) {
      // TODO: query for more account info
      res.json({ username: accounts[0].username }).end();
    } else {
      res.status(401).end();
    }
  });
});

module.exports = router;
