import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Internal Railway connections don't use SSL; public proxy connections do
const dbUrl = process.env.DATABASE_URL || '';
const useSSL = dbUrl.includes('railway') && !dbUrl.includes('.internal');

export const pool = new Pool({
  connectionString: dbUrl,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

// Helper for single queries
export async function query(text: string, params?: any[]) {
  const result = await pool.query(text, params);
  return result;
}

// Helper for transactions
export async function transaction<T>(fn: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
