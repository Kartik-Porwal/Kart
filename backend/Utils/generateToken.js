const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    //console.log(token);
    return token;
}

module.exports = generateToken;