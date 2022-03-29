/**
 * Loading dependencies
 */
 const Joi = require('joi');

 const categorySchema = Joi.object({
   title: Joi
     .string()
     .min(3)
     .max(20)
     .required(),
 })
 
 module.exports = categorySchema;