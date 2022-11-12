const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectData = require('../errors/IncorrectData');
const ExistEmailError = require('../errors/ExistEmailError');
const { INCORRECT_DATA_MESSAGE, NOT_FOUND_USER_ID_MESSAGE, EXIST_EMAIL_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.signUp = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email, name, password: hash,
    }))
    .then((user) => res.status(201).send({
      email, name, password, _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistEmailError(EXIST_EMAIL_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  Users.findById(userId).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  Users.findByIdAndUpdate(
    userId,
    { email, name },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else if (err.name === 'CastError') {
        next(new IncorrectData(NOT_FOUND_USER_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
