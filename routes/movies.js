const movies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const createMovieValidation = require('../validation/createMovieValidation');
const searchMovieByIdValidation = require('../validation/searchMovieByIdValidation');

movies.get('/movies', getMovies);
movies.post('/movies', createMovieValidation, createMovie);
movies.delete('/movies/:movieId', searchMovieByIdValidation, deleteMovie);

module.exports = movies;
