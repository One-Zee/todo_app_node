const UserSchema = require('../schemaValidation/userSchema');
const CategorySchema = require('../schemaValidation/categorySchema');
const objectIdSchema = require('../schemaValidation/objectIdSchema');
const TaskSchema = require('../schemaValidation/taskSchema');

async function errorChecker( data, schema ) {
    const { error, value } = await schema.validate(data);
    if(error)
        return { validity:false , msg:error.details[0].message}
    else if(value)
        return { validity:true , msg:''}
    
}


exports.UserValidation = async (req,res,next) => {
    const { username, password } = req.body;
    const temp = { username , password }    
    const validation = await errorChecker( temp, UserSchema )
    if(validation.validity){
        next()
    }else{
        res.status(400).json({auth: false , msg:validation.msg})
    }
}

exports.CategoryValidation = async (req,res,next) => {
    const { title } = req.body;
    const temp = { title }    
    const validation = await errorChecker( temp, CategorySchema )
    if(validation.validity){
        next()
    }else{
        res.status(400).json({auth: true , msg:validation.msg})
    }
}

exports.paramsIdValidation = async (req,res,next) => {
    const { id } = req.params;
    const temp = { id }    
    const validation = await errorChecker( temp, objectIdSchema );
    if(validation.validity){
        next()
    }else{
        res.status(400).json({auth: true , msg:validation.msg})
    }
}

exports.taskMoveValidation = async (req,res,next) => {
    const { to , from } = req.body;
    const { id } = req.params;
    const validation1 = await errorChecker( { id }, objectIdSchema )
    const validation2 = await errorChecker( { id:to }, objectIdSchema )
    const validation3 = await errorChecker( { id:from }, objectIdSchema )
    if(validation1.validity && validation2.validity && validation3.validity){
        next()
    }else{
        res.status(400).json({auth: true , msg:'invalid data'})
    }
}

exports.taskValidation = async (req,res,next) => {
    const { title , completed } = req.body;
    const validation = await errorChecker( { title, completed }, TaskSchema )
    if(validation.validity){
        next()
    }else{
        res.status(400).json({auth: true , msg:validation.msg})
    }
}

