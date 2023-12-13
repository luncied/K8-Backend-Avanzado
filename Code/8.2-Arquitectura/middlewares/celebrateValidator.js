const { celebrate, Segments } = require('celebrate');
const { schema } = require('../validators/user.validators');

const celebrateValidator = celebrate({
  [Segments.BODY] : schema
})

module.exports = { celebrateValidator };