/**
 * Loading dependencies
 */
 const Joi = require('joi');

 const objectIdSchema = Joi.object({
   id: Joi
     .string()
     .min(24)
     .max(24)
     .required(),
 })
 
 module.exports = objectIdSchema;