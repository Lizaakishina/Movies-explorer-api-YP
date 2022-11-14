const { Joi, celebrate } = require('celebrate');

const searchMovieByIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = searchMovieByIdValidation;
