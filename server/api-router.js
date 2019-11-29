// External Dependencies
const express = require('express');

// Internal Dependencies
const { login } = require('./controllers/login-controller');
const { postSignUp } = require('./controllers/signup-controller');
const {
  deleteGifFromAccount,
  getAccount,
  getAccountGifTags,
  postGifToAccount,
  postTagsToAccount,
} = require('./controllers/account-controller');

const router = express.Router();

router.get('/api/login', login);
router.post('/api/signup', postSignUp);

router.get('/api/account/:accountid', getAccount);
router.get('/api/account/:accountid/gif/:giphyid', getAccountGifTags);
router.post('/api/account/:accountid/gif', postGifToAccount);
router.post('/api/account/:accountid/tags', postTagsToAccount);
router.delete('/api/account/:accountid/gif/:gifid', deleteGifFromAccount);

module.exports = router;
