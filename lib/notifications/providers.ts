/**
 * Notification Providers - Email and SMS Integration
 *
 * Supported providers:
 * - Email: SendGrid, SMTP (nodemailer)
 * - SMS: Twilio
 */

// ============================================
// EMAIL PROVIDER
// ============================================

interface EmailOptions {
  to: string
  subject: string
  body: string
  html?: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send email via configured provider
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const provider = process.env.EMAIL_PROVIDER || 'smtp'

  switch (provider) {
    case 'sendgrid':
      return sendEmailViaSendGrid(options)
    case 'smtp':
    default:
      return sendEmailViaSMTP(options)
  }
}

/**
 * SendGrid Email Provider
 * Requires: SENDGRID_API_KEY, EMAIL_FROM
 */
async function sendEmailViaSendGrid(options: EmailOptions): Promise<EmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.EMAIL_FROM || 'noreply@angelscare-homehealth.com'

  if (!apiKey) {
    console.error('[Email] SendGrid API key not configured')
    return { success: false, error: 'SendGrid API key not configured' }
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: options.to }] }],
        from: { email: fromEmail, name: "Angel's Care Home Health" },
        subject: options.subject,
        content: [
          { type: 'text/plain', value: options.body },
          ...(options.html ? [{ type: 'text/html', value: options.html }] : [])
        ],
      }),
    })

    if (response.ok || response.status === 202) {
      const messageId = response.headers.get('x-message-id') || `sg-${Date.now()}`
      console.log(`[Email] Sent via SendGrid to ${options.to}, messageId: ${messageId}`)
      return { success: true, messageId }
    } else {
      const errorBody = await response.text()
      console.error(`[Email] SendGrid error: ${response.status} - ${errorBody}`)
      return { success: false, error: `SendGrid error: ${response.status}` }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[Email] SendGrid exception: ${errorMsg}`)
    return { success: false, error: errorMsg }
  }
}

/**
 * SMTP Email Provider (via nodemailer)
 * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
 */
async function sendEmailViaSMTP(options: EmailOptions): Promise<EmailResult> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT || '587'
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.EMAIL_FROM || 'noreply@angelscare-homehealth.com'
  const fromName = process.env.EMAIL_FROM_NAME || "Angel's Care Home Health"

  if (!smtpHost || !smtpUser || !smtpPass) {
    // Fallback to mock if SMTP not configured
    console.log(`[Email MOCK] To: ${options.to}, Subject: ${options.subject}`)
    console.log(`[Email MOCK] Body: ${options.body.substring(0, 100)}...`)
    return { success: true, messageId: `mock-${Date.now()}` }
  }

  try {
    // Dynamic import nodemailer to avoid bundling issues
    const nodemailer = await import('nodemailer')

    const transporter = nodemailer.default.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465', // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.body,
      ...(options.html && { html: options.html }),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`[Email SMTP] Sent to ${options.to}, messageId: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown SMTP error'
    console.error(`[Email SMTP] Error sending to ${options.to}: ${errorMsg}`)
    return { success: false, error: errorMsg }
  }
}


// ============================================
// SMS PROVIDER
// ============================================

interface SMSOptions {
  to: string
  body: string
}

interface SMSResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send SMS via Twilio
 * Requires: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
 */
export async function sendSMS(options: SMSOptions): Promise<SMSResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromPhone = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromPhone) {
    // Fallback to mock if Twilio not configured
    console.log(`[SMS MOCK] To: ${options.to}, Body: ${options.body.substring(0, 100)}...`)
    return { success: true, messageId: `mock-sms-${Date.now()}` }
  }

  // Format phone number (ensure E.164 format)
  let toPhone = options.to.replace(/\D/g, '')
  if (toPhone.length === 10) {
    toPhone = `+1${toPhone}` // Assume US number
  } else if (!toPhone.startsWith('+')) {
    toPhone = `+${toPhone}`
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: toPhone,
        From: fromPhone,
        Body: options.body,
      }),
    })

    const data = await response.json()

    if (response.ok && data.sid) {
      console.log(`[SMS] Sent via Twilio to ${toPhone}, sid: ${data.sid}`)
      return { success: true, messageId: data.sid }
    } else {
      const errorMsg = data.message || `Twilio error: ${response.status}`
      console.error(`[SMS] Twilio error: ${errorMsg}`)
      return { success: false, error: errorMsg }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[SMS] Twilio exception: ${errorMsg}`)
    return { success: false, error: errorMsg }
  }
}


// ============================================
// PROVIDER STATUS CHECK
// ============================================

export interface ProviderStatus {
  email: {
    configured: boolean
    provider: string
  }
  sms: {
    configured: boolean
    provider: string
  }
}

/**
 * Check which providers are configured
 */
export function getProviderStatus(): ProviderStatus {
  const emailProvider = process.env.EMAIL_PROVIDER || 'smtp'
  const emailConfigured = emailProvider === 'sendgrid'
    ? !!process.env.SENDGRID_API_KEY
    : !!(process.env.SMTP_HOST && process.env.SMTP_USER)

  const smsConfigured = !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  )

  return {
    email: {
      configured: emailConfigured,
      provider: emailConfigured ? emailProvider : 'mock'
    },
    sms: {
      configured: smsConfigured,
      provider: smsConfigured ? 'twilio' : 'mock'
    }
  }
}
