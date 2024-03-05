import { config } from "dotenv";
import sql from "mssql";
config();
const { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const pool = await sql.connect({
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
