const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { NOT_REGISTERED_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(NOT_REGISTERED_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError(NOT_REGISTERED_MESSAGE));
  }
  req.user = payload;
  return next();
};
