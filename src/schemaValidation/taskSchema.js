/**
 * Loading dependencies
 */
 const Joi = require('joi');

 const taskSchema = Joi.object({
    title: Joi
    .string()
    .min(3)
    .max(50),
    completed: Joi
    .boolean()

 })
 
 module.exports = taskSchema;