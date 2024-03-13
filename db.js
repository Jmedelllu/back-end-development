const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '110803',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'back-end'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};