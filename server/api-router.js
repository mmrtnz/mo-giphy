// External Dependencies
const express = require('express');
const mongoose = require('mongoose');
const { Base64 } = require('js-base64');

const { ObjectId } = mongoose.Types;

// Internal Dependencies
const {
  Account,
  Gif,
} = require('./models');

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
      res.json({
        // eslint-disable-next-line no-underscore-dangle
        accountId: accounts[0]._id,
        username: accounts[0].username,
      }).end();
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
      res.json({
        // eslint-disable-next-line no-underscore-dangle
        accountId: account._id,
        username: account.username,
      }).end();
    }
  });
};

// Renames id from giphy data to avoid issues
const gifFromGiphyData = ({ id, ...giphyData }) => new Gif({
  giphyId: id,
  ...giphyData,
});

const handleSaveGif = (req, res) => {
  const { accountid } = req.params;
  const {
    giphyData,
    // tags,
  } = req.body;

  Account.findById(new ObjectId(accountid))
    .then((account) => {
      Gif.find({ giphyId: giphyData.id }).exec((gifErr, gifs) => {
        if (gifErr) {
          throw new Error('Error when finding Gif', gifErr);
        }

        // Add gif to db if it doesn't exist
        let gif;
        if (!gifs.length) {
          console.log(`Saving new gif - id: ${giphyData.id}`);
          gif = gifFromGiphyData(giphyData);

          gif.save((error) => {
            if (error) {
              throw new Error('Error saving gif to db');
            }
          });
        } else {
          // eslint-disable-next-line prefer-destructuring
          gif = gifs[0];
        }

        // Save gif to account
        // eslint-disable-next-line no-underscore-dangle
        account.gifs.push(gif);
        account.save((error) => {
          if (error) {
            throw new Error('Error saving account changes to db');
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });

  res.status(200).end();
};

router.get('/api/login', handleLogin);
router.post('/api/signup', handleSignUp);
router.post('/api/:accountid/gif', handleSaveGif);

module.exports = router;
