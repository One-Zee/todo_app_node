/**
 * Loading dependencies
 */
const Joi = require('joi');

const UsersSchema = Joi.object({
  username: Joi
    .string()
    .min(5)
    .max(20)
    .required(),
  password: Joi
    .string()
    .min(5)
    .max(20)
    .required(),
}).with('username', 'password');

module.exports = UsersSchema;