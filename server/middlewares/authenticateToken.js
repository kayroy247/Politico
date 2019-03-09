import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access'] || req.body.token || req.headers.token;
  const authHeader = req.headers.authorization;
  req.decoded = '';
  if (!(token || authHeader)) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed, empty token'
    });
  }
  if ((authHeader && authHeader.includes(' ')) || (token && token.includes(' '))) {
    const [, authToken] = authHeader.split(' ');
    const userToken = authToken || token;

    jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Auth Failed Due To Invalid Token'
        });
      }
      // for use in other middlewares
      req.decoded = decoded;
      return true;
    });
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Please supply authorization header token with the word "Bearer" preceeding it, separted by an empty space'
  });
};

export default authenticateToken;
