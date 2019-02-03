import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const authenticateUser = (req, res, next) => {
  if (!req.headers) {
    return res.status(400).json({
      status: 400,
      error: 'Header undefined'
    });
  }
  const token = req.headers['x-access'] || req.body.token || req.headers.token;
  const authHeader = req.headers.authorization;
  if (!(token || authHeader)) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed, empty token'
    });
  }
  if ((authHeader && authHeader.includes(' ')) || token) {
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
      return next();
    });
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Please supply authorization header token with the word "Bearer" preceeding it, separted by an empty space'
    });
  }
  return true;
};

const authenticateAdmin = (req, res, next) => {
  if (!req.headers) {
    return res.status(400).json({
      status: 400,
      error: 'Header undefined'
    });
  }
  const token = req.headers['x-access'] || req.body.token || req.headers.token;
  const authHeader = req.headers.authorization;
  if (!(token || authHeader)) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed, empty token'
    });
  }
  if ((authHeader && authHeader.includes(' ')) || token) {
    const [, authToken] = authHeader.split(' ');
    const userToken = authToken || token;
    jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'Auth Failed Due To Invalid Token'
        });
      }
      req.decoded = decoded;
      if (!decoded.isadmin) {
        return res.status(403).json({
          status: 403,
          error: 'Auth failed, User not authorized'
        });
      }
      return next();
    });
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Please supply authorization header token with the word "Bearer" preceeding it, separted by an empty space'
    });
  }
  return true;
};

const auth = { authenticateAdmin, authenticateUser };

export default auth;
