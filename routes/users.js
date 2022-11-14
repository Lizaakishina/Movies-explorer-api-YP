const user = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const patchUserValidation = require('../validation/patchUserValidation');

user.get('/users/me', getUser);
user.patch('/users/me', patchUserValidation, patchUser);

module.exports = user;
