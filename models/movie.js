const mongoose = require('mongoose');
const { validLink } = require('../utils/constants');
const { validImageLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    default: '',
    required: true,
    validate: {
      validator: (image) => validImageLink.test(image),
      message: 'Некорректный формат ссылки на картинку фильма',
    },
  },
  trailerLink: {
    type: String,
    default: '',
    required: true,
    validate: {
      validator: (link) => validLink.test(link),
      message: 'Некорректный формат ссылки на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    default: '',
    required: true,
    validate: {
      validator: (image) => validImageLink.test(image),
      message: 'Некорректный формат ссылки на мини-картинку фильма',
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('movie', movieSchema);
