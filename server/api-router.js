// External Dependencies
const express = require('express');

// Internal Dependencies
const { login } = require('./controllers/login-controller');
const { postGifToAccount } = require('./controllers/account-controller');
const { postSignUp } = require('./controllers/signup-controller');

const router = express.Router();

router.get('/api/login', login);
router.post('/api/signup', postSignUp);
router.post('/api/account/:accountid/gif', postGifToAccount);

module.exports = router;
