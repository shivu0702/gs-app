import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: "sql.freedb.tech",
      user: "freedb_freedb_myuser",
      password: "v#E!yUZWqHcaF37",
      database: "freedb_myapp_db",
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 10000,
    });
  }
  return pool;
}