const jwt = require("jsonwebtoken");
const User = require('../Models/UserModel');

const protect = async(req, res, next) => {
    let token;
    if(req.cookie.token){
        try{
            const decoded = jwt.verify(req.cookie.token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded).select('-password');
            next();
        } catch(err){
         res.status(401).json({message: 'Not authorized'});
        }
    }
    else{
        res.status(401).json({message: 'Not authorized, No token'});
    }
};

module.exports = protect;