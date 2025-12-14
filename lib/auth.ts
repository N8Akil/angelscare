import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { queryOne } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'angelscare-dev-secret-change-in-production'
const COOKIE_NAME = 'angelscare_admin_token'
const TOKEN_EXPIRY = '24h'

export interface AdminUser {
  id: string
  email: string
  name: string | null
}

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Create a JWT token
 */
export function createToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  )
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

/**
 * Set the auth cookie
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  })
}

/**
 * Get the auth cookie value
 */
export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || null
}

/**
 * Clear the auth cookie
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * Get the current admin user from the auth cookie
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const token = await getAuthCookie()
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  const user = await queryOne<AdminUser>(
    'SELECT id, email, name FROM admin_users WHERE id = $1 AND is_active = true',
    [payload.userId]
  )

  return user
}

/**
 * Authenticate an admin user
 */
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; token?: string; error?: string }> {
  const user = await queryOne<AdminUser & { password_hash: string }>(
    'SELECT id, email, name, password_hash FROM admin_users WHERE email = $1 AND is_active = true',
    [email.toLowerCase()]
  )

  if (!user) {
    return { success: false, error: 'Invalid email or password' }
  }

  const validPassword = await verifyPassword(password, user.password_hash)
  if (!validPassword) {
    return { success: false, error: 'Invalid email or password' }
  }

  // Update last login
  await queryOne(
    'UPDATE admin_users SET last_login = NOW() WHERE id = $1',
    [user.id]
  )

  const token = createToken(user.id, user.email)

  return {
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
    token,
  }
}
