import '@babel/polyfill';
import { Pool } from 'pg';
import { config } from 'dotenv';
import createTables from './createTables'
// import dropTables from './dropTa

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
  .then((result) => {
    console.log(`Tables Created ${result}`);
  })
  .catch((err) => {
    console.log(err.message);
  });


export default query;
