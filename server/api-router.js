// External Dependencies
const express = require('express');

// Internal Dependencies
const { login } = require('./controllers/login-controller');
const { postSignUp } = require('./controllers/signup-controller');
const {
  deleteGifFromAccount,
  postGifToAccount,
} = require('./controllers/account-controller');

const router = express.Router();

router.get('/api/login', login);
router.post('/api/signup', postSignUp);
router.post('/api/account/:accountid/gif', postGifToAccount);
router.delete('/api/account/:accountid/gif/:gifid', deleteGifFromAccount);

module.exports = router;
