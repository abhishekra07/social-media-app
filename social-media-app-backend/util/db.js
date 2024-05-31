import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  ssl: false,
  port: process.env.DB_PORT,
  max: 6,
  idleTimeoutMillis: 30000000,
  connectionTimeoutMillis: 2000000,
});

export default (text, params) => pool.query(text, params);
