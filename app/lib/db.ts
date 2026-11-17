import mysql, { type Pool } from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be set to connect to MySQL.');
}

const globalForMysql = globalThis as unknown as {
  mysqlPool?: Pool;
};

export const db =
  globalForMysql.mysqlPool ??
  mysql.createPool(databaseUrl);

if (process.env.NODE_ENV !== 'production') {
  globalForMysql.mysqlPool = db;
}

export async function queryRows<T>(
  query: string,
  values: unknown[] = [],
): Promise<T[]> {
  const [rows] = await db.query<RowDataPacket[]>(query, values);
  return rows as T[];
}
