const User = require('../db/models/userModel');
const { checksTask } = require('../db/query')

/**
 *  Checks for existing username 
 */
 exports.duplicateUser = async ( req , res , next ) =>{
    const { username } = req.body;
    try {
        if(username === undefined)
            next()
        else{
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
exports.isTaskfromCategory = async ( req , res , next ) =>{
    const { from } = req.body;//CategoryId where Task curently resides
    const { id } = req.params;//taskId
    const authorId = req.userId;
    try {
        const checker = await checksTask({_id:id, from}, authorId )
        checker ? next(): res.status(400).json({auth:true,msg: 'client error'})
    }
    catch( err ){
        res.status( 500 ).json( 'Server Error!!' );
    }
}

