const user = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');

user.get('/users/me', getUser);
user.patch('/users/me', patchUser);

module.exports = user;
