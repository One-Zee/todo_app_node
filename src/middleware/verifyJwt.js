const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../config');
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
	  return res.status(401).send(
		  { 
			auth: false,
			msg: "Unauthorized! Access Token was expired!" 
		});
	}
	return res.sendStatus(401).send(
	{
		auth: false, 
		msg: 'Unauthorized!'
	});
}

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
		if (err) {
			return catchError(err, res);
		}
		//console.log(decoded.id);
		req.userId = decoded.id;
		next();
	});
}