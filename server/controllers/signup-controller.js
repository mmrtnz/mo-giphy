// External Dependencies
const { Base64 } = require('js-base64');

// Internal Dependencies
const { Account } = require('../models');

// Endpoint Function Definitions
exports.postSignUp = (req, res) => {
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
      res.json({
        // eslint-disable-next-line no-underscore-dangle
        accountId: account._id,
        username: account.username,
      }).end();
    }
  });
};
