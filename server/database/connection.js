import '@babel/polyfill';
import { Pool } from 'pg';
import { config } from 'dotenv';
import createTables from './createTables';
import password from '../helpers/passwordHash';
// import dropTables from './dropTables';


config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// function to connect and query the Politico database
const query = async (sqlQuery, values) => {
  const client = await pool.connect();
  const result = await client.query(sqlQuery, values);
  client.release();
  return result;
};
const tables = `${createTables}`;
query(tables, [])
  .catch((err) => {
    console.log(err.message);
  });

(async () => {
  const hashedPassword = await password.hashPassword('password');
  await query('SELECT * FROM users WHERE email = $1', ['okunladekayode@gmail'])
    .then((result) => {
      if (result.rows.length < 1) {
        query('INSERT INTO users(firstname, lastname, email, password, phone_number, isadmin, passport_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', ['kayode', 'okunlade', 'okunladekayode@gmail', hashedPassword, '09094906949', true, 'http://a.com']);
      }
    }).catch((err) => { console.log(err); });
})();


export default query;
