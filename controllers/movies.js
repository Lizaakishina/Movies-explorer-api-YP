const Movies = require('../models/movie');
const IncorrectData = require('../errors/IncorrectData');
const { INCORRECT_DATA_MESSAGE, NOT_FOUND_MOVIE_ID_MESSAGE, NOT_RIGHTS_MESSAGE } = require('../utils/constants');
const NotRightError = require('../errors/NotRightError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movies.find({ owner: userId })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movies.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId).orFail(new NotFoundError(NOT_FOUND_MOVIE_ID_MESSAGE))
    .then((movie) => {
      const user = String(req.user._id);
      const movieOwner = String(movie.owner);
      if (user === movieOwner) {
        Movies.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      } else {
        next(new NotRightError(NOT_RIGHTS_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};
