/**
 * Loading dependencies
 */
 const Joi = require('joi');

 const taskSchema = Joi.object({
    title: Joi
    .string()
    .min(3)
    .max(20),
    completed: Joi
    .boolean()

 })
 
 module.exports = taskSchema;