const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../config');

exports.getToken = (req,res,next) => {
    const { authorization } = req.headers;
    if (!authorization){
        //console.log('No token provided.');
		return res.status(403).json({ 
			auth: false, msg: 'No token provided.' 
		});
	}
    req.token = authorization.split(" ")[1];
    //console.log("token --> " + req.token);
    next(); 
}

exports.verifyToken = (req,res,next) => {
    const { token } = req;
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err){
            console.log(err);
			return res.status(403).json({ 
					auth: false, 
					msg: 'Failed to authenticate.'
				});
		}
		//console.log(decoded.id);
		req.userId = decoded.id;
		next();
	});
}