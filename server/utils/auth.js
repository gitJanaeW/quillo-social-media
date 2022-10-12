const jwt = require('jsonwebtoken');
const secret = 'mysecrets';
const expiration = '2h';

module.exports = {
    signToken: function({username, email, _id}) {
        const payload = {username, email, _id};
        // adds user properties to the token 
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
    authMiddleware: function({ req }) {
        // allow tokens to be sent via the body, query or header (checking in that order)// allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
        // if no token, return request object as is
        if (!token) {
          return req;
        }
        try {
          // if token, decode and attach user data to request object
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object with token
        return req;
      }

}