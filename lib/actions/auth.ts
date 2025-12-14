'use server'

import { redirect } from 'next/navigation'
import { authenticateAdmin, setAuthCookie, clearAuthCookie } from '@/lib/auth'
import { query } from '@/lib/db'

export type LoginResult = {
  success: boolean
  error?: string
}

/**
 * Server action for admin login
 */
export async function loginAction(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  const result = await authenticateAdmin(email, password)

  if (!result.success || !result.token) {
    return { success: false, error: result.error || 'Authentication failed' }
  }

  // Log the login
  await query(
    `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
     VALUES ($1, $2, $3, $4)`,
    [result.user?.id, 'login', 'session', JSON.stringify({ email: result.user?.email })]
  )

  await setAuthCookie(result.token)

  return { success: true }
}

/**
 * Server action for admin logout
 */
export async function logoutAction(): Promise<void> {
  await clearAuthCookie()
  redirect('/admin/login')
}
