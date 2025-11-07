const mysql = require('mysql2');
import { createPool } from 'mysql2';
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export async function execute(sql, params) {
  return await pool.execute(sql, params);
}

