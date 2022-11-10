const { Joi, celebrate } = require('celebrate');

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = patchUserValidation;
