import mysql from "mysql2/promise";

const globalForMySQL = globalThis;
let pool = globalForMySQL.mysqlPool;

function createPool() {
  const required = ["MYSQL_HOST", "MYSQL_USER", "MYSQL_PASSWORD", "MYSQL_DATABASE"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const error = new Error("Missing required database environment variables");
    error.code = "DB_CONFIGURATION_ERROR";
    throw error;
  }

  const port = Number(process.env.MYSQL_PORT || 4000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    const error = new Error("MYSQL_PORT must be a valid TCP port");
    error.code = "DB_CONFIGURATION_ERROR";
    throw error;
  }

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port,
    ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
    connectTimeout: 10000,
  });
}

export function getDb() {
  if (!pool) {
    pool = createPool();
  }

  if (process.env.NODE_ENV !== "production") {
    globalForMySQL.mysqlPool = pool;
  }

  return pool;
}
