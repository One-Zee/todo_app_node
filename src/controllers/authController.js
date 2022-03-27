/**
 * loading dependencies
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SALT, ACCESS_TOKEN_SECRET, EXPIRES_IN } = require('../../config');
const  User  = require('../db/models/userModel');

/**
 * User login 
 */
exports.signIn = async (req,res) => {
    const { username , password } = req.body;
    
    try {
        const user = await User.findOne({username});
        console.log(user)
        if(!user)
            res.status(400).json({ auth: false, accessToken: null, msg: "User not found!" })//user not found
        else{
            const passwordIsValid = await bcrypt.compare(password,user.password);
            if (!passwordIsValid) {
                res.status(400).json({ auth: false, accessToken: null, msg: "Invalid Password!" });//invalid password
            }else{
                const token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
                    expiresIn: EXPIRES_IN // expires in 2 hours
                  });
                res.status(200).json({ auth: true, accessToken: token, msg: "Logged in!" })
            }
        }
    } catch (error) {
        res.status(500).json('Server error!!');
        console.log({status:'fail',error});
    }
}

/**
 * User Register
 */
exports.signUp = async (req,res) => {
    const { username , password } = req.body;
    
    try {
        const { _id } = await User.create({username,password:await bcrypt.hash(password, SALT)});

        res.status(201).json({
            signUp: true,
            msg: 'Sign up successfull.',
            data:{
                id:_id,
                username
            }
        })
    } catch (error) {
        console.log({status:'fail',error});
        res.status(500).json('Server error!!');
    }
}