const validator = require('validator');
const IncorrectData = require('../errors/IncorrectData');

const validationURL = (value) => {
  if (!validator.isURL((value), { require_protocol: true })) {
    throw new IncorrectData('Невалидный URL-адресс');
  } else {
    return value;
  }
};

module.exports = validationURL;
