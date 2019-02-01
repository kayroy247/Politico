import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const authenticateUser = (req, res, next) => {
  const token = req.headers['x-access'] || req.body.token || req.headers.token;
  const authHeader = req.headers.authorization;
  if (!(token || authHeader)) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed, empty token'
    });
  }
  if ((authHeader && authHeader.includes(' ')) || token) {
    const [, authToken] = authHeader.split(' ');
    const userToken = authToken || token;

    jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Auth Failed Due To Invalid Token',
          erro: err.message
        });
      }
      // for use in other middlewares
      req.body.decoded = decoded;
      return next();
    });
  } else {
    res.status(401).json({
      status: 401,
      error: 'Please supply authorization header token with the word "Bearer" preceeding it, separted by an empty space'
    });
  }
  return true;
};

const authenticateAdmin = (req, res, next) => {
  const token = req.headers['x-access'] || req.body.token || req.headers.token;
  const authHeader = req.headers.authorization;
  if (!(token || authHeader)) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed, empty token'
    });
  }
  if ((authHeader && authHeader.includes(' ')) || token) {
    const [, authToken] = authHeader.split(' ');
    const userToken = authToken || token;
    jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Auth Failed Due To Invalid Token',
          erro: err.message
        });
      }
      req.body.decoded = decoded;
      if (!decoded.isadmin) {
        res.status(403).json({
          status: 403,
          error: 'Auth failed, User not authorized'
        });
      }
      next();
    });
  } else {
    res.status(401).json({
      status: 401,
      error: 'Please supply authorization header token with the word "Bearer" preceeding it, separted by an empty space'
    });
  }
  return true;
};

const auth = { authenticateAdmin, authenticateUser };

export default auth;
