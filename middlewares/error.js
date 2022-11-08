const { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(SERVER_ERROR_CODE).json({ message: SERVER_ERROR_MESSAGE });
  }
  next();
};
