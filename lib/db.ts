import { Pool, PoolClient } from 'pg'

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/angelscare',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Log connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

/**
 * Execute a query and return all rows
 */
export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const start = Date.now()
  const result = await pool.query(text, params)
  const duration = Date.now() - start

  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text: text.substring(0, 100), duration, rows: result.rowCount })
  }

  return result.rows as T[]
}

/**
 * Execute a query and return single row or null
 */
export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] || null
}

/**
 * Execute a query and return the count of affected rows
 */
export async function execute(
  text: string,
  params?: unknown[]
): Promise<number> {
  const result = await pool.query(text, params)
  return result.rowCount || 0
}

/**
 * Run multiple queries in a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

/**
 * Helper to build pagination
 */
export function paginate(page: number = 1, limit: number = 20): { offset: number; limit: number } {
  const safeLimit = Math.min(Math.max(1, limit), 100)
  const safePage = Math.max(1, page)
  return {
    offset: (safePage - 1) * safeLimit,
    limit: safeLimit,
  }
}

/**
 * Helper to get total count for pagination
 */
export async function getCount(table: string, whereClause: string = '', params: unknown[] = []): Promise<number> {
  const sql = `SELECT COUNT(*) as count FROM ${table} ${whereClause ? 'WHERE ' + whereClause : ''}`
  const result = await queryOne<{ count: string }>(sql, params)
  return parseInt(result?.count || '0', 10)
}

export { pool }
