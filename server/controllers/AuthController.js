import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Password from '../helpers/passwordHash';
import query from '../database/connection';

config();

class AuthController {
  static signUp(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber
    } = req.body;
    let { isAdmin } = req.body;
    if (!isAdmin) { isAdmin = false; }
    const createUser = async () => {
      const hashedPassword = await Password.hashPassword(password);
      await query('INSERT INTO users(firstname, lastname, email, password, phone_number, isadmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, phone_number', [firstname, lastname, email, hashedPassword, phoneNumber, isAdmin])
        .then((result) => {
          const jwtToken = jwt.sign({ id: result.rows[0].id, isadmin: result.rows[0].isadmin }, process.env.JWT_KEY, { expiresIn: '24h' });
          return res.status(201).json({
            status: 201,
            data: [{
              token: jwtToken,
              user: result.rows[0]
            }]
          });
        })
        .catch((err) => {
          const errMessage = err.message;
          return res.status(409).json({
            status: 409,
            error: `Unable to create user account: ${errMessage}`
          });
        });
    };
    createUser().catch((err) => {
      console.log(err);
    });
  }

  static login(req, res) {
    const {
      email,
      password
    } = req.body;
    const loginUser = async () => {
      query('SELECT * FROM users WHERE email = $1', [email])
        .then((result) => {
          if (result.rows.length < 1) {
            return res.status(404).json({
              status: 404,
              error: 'The email does not exist'
            });
          }
          const { id, isadmin } = result.rows[0];
          const comparePassword = Password.comparePassword(password, result.rows[0].password);
          if (comparePassword) {
            const jwtToken = jwt.sign({ id, isadmin }, process.env.JWT_KEY, { expiresIn: '24h' });
            const value = result.rows[0];
            delete value.password;
            delete value.isadmin;
            return res.status(200).json({
              status: 201,
              data: [{
                token: jwtToken,
                user: value
              }]
            });
          }
          return res.status(401).json({
            status: 401,
            success: false,
            error: 'Login Failed, wrong password'
          });
        })
        .catch((err) => {
          const errMessage = err.message;
          return res.status(404).json({
            status: 404,
            error: `Unable to login user${errMessage}`
          });
        });
    };
    loginUser().catch((err) => {
      console.log(err);
    });
  }
}

export default AuthController;
