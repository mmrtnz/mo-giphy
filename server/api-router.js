// External Dependencies
const express = require('express');
const mongoose = require('mongoose');
const { Base64 } = require('js-base64');

const { ObjectId } = mongoose.Types;

// Internal Dependencies
const {
  Account,
  AccountGifTag,
  Gif,
  Tag,
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

const handleSaveGif = async (req, res) => {
  const { accountid } = req.params;
  const {
    giphyData,
    tags,
  } = req.body;

  const handleError = errorMessage =>
    (error) => {
      if (error) {
        throw new Error(errorMessage);
      }
    };

  try {
    // Get account
    const account = await Account.findById(new ObjectId(accountid));

    // Get gif, add to db if it doesn't exist
    const gifs = await Gif.find({ giphyId: giphyData.id });

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

    // Get tags, add them to db if they don't exist
    let tagModels = [];
    const matchingTags = await Tag.find({ description: { $in: tags } });
    const matchingTagNames = matchingTags.map(t => t.description);
    const newTags = tags.filter(t => !matchingTagNames.includes(t));

    newTags.forEach((tagName) => {
      console.log(`Saving new tag - ${tagName}`);
      const currentTagModel = new Tag({ description: tagName });

      tagModels.push(currentTagModel);
      currentTagModel.save(handleError(`Error saving tag ${tagName} to db`));
    });

    tagModels = tagModels.concat(matchingTags);

    console.log('matchingTags', matchingTags);
    console.log('tags', tags);
    console.log('newTags', newTags);

    // Update/create link between tags, gif, and account
    /* eslint-disable no-underscore-dangle */
    const accountGifTags = new AccountGifTag({
      accountId: account._id,
      gifId: gif._id,
      tagIds: tagModels,
    });
    /* eslint-enable no-underscore-dangle */
    accountGifTags.save(handleError('Error saving AccountGifTag'));

    // Save gif to account
    // eslint-disable-next-line no-underscore-dangle
    account.gifs.push(gif);
    account.save(handleError('Error saving account changes to db'));
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(200).end();
};

router.get('/api/login', handleLogin);
router.post('/api/signup', handleSignUp);
router.post('/api/:accountid/gif', handleSaveGif);

module.exports = router;
