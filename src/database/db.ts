import mysql from 'mysql2/promise';

export async function connectDB() {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'estacionamiento',
    port: Number(process.env.DB_PORT) || 3306
  });
}