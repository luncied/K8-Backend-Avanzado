const Joi = require('joi');

const schema = Joi.object({
  userName: Joi.string().min(3).max(30).required().messages({
    "string.base": `Username debe ser una cadena de caracteres`,
    "string.empty": `Username no debe estar vacio`,
    "string.min":  `Username debe tener un minimo de {#limit} caracteres`,
    "any.required":  `El campo Username es requerido`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `El campo email debe tener un formato valido`,
  }),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(3).max(30).required().messages({
    "string.min": `El campo password debe tener un mínimo de {#limit} caracteres`
  }),
  service: Joi.string().required(),
})

module.exports = { schema }