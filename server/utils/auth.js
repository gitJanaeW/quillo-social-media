const jwt = require('jsonwebtoken');
const secret = 'mysecrets';
const expiration = '2h';

module.exports = {
    signToken: function({username, email, _id}) {
        const payload = {username, email, _id};
        // adds user properties to the token 
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    }
}