import query from '../database/connection';
import validators from '../validators/inputValidator';

const checkEmail = (req, res, next) => {
  query('SELECT * FROM users WHERE email = $1', [req.body.email])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(409).json({
          status: 409,
          error: 'User with the email already exist'
        });
      }
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: 400,
        error: 'Bad Request'
      });
    });
};

const validateUser = (req, res, next) => {
  const { error } = validators.validateCreateUser(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
  }
  return next();
};

const loginValidator = (req, res, next) => {
  const { error } = validators.validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
  }
  return next();
};

const userCheck = { checkEmail, validateUser, loginValidator };

export default userCheck;
