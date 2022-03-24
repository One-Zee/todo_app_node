const User = require('../db/models/userModel')

/**
 *  Checks for existing username 
 */
 exports.duplicateUser = async ( req , res , next ) =>{
    const { username } = req.body;
    try {
        if(username === undefined){
            next()
        }else{
        const user = await User.findOne({ username })
            if( user )
                res.status(200).json({ signUp: false, msg: "Username already exists", data:null });
            else
                next();
        }
    }
    catch( err ){
        res.status( 500 ).json( 'Server Error!!' );
    }
}
