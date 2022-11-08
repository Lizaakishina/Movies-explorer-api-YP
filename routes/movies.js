const movies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/movies', getMovies);
movies.post('/movies', createMovie);
movies.delete('/movies/:movieId', deleteMovie);

module.exports = movies;
