# Email & SMS Notification Setup Guide

This guide explains how to configure the notification system to actually send emails and SMS messages.

## Current Status

By default, notifications run in **Mock Mode** - messages are logged to console but not actually sent. This is useful for testing the system without sending real messages.

## Option 1: Gmail SMTP (Easiest)

Gmail is the easiest option to set up for email notifications.

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Enable **2-Step Verification** if not already enabled

### Step 2: Create an App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select your device type (or "Other" and name it "Angel's Care")
4. Click **Generate**
5. Copy the 16-character password (no spaces needed)

### Step 3: Update .env.local
Edit `/mnt/extreme-pro/angelscare/.env.local`:

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM=your-gmail@gmail.com
EMAIL_FROM_NAME=Angel's Care Home Health
```

### Step 4: Restart the Server
```bash
pm2 restart angelscare
```

---

## Option 2: SendGrid (Professional)

SendGrid offers better deliverability and analytics for production use.

### Step 1: Create SendGrid Account
1. Sign up at: https://sendgrid.com
2. Verify your email

### Step 2: Create API Key
1. Go to Settings > API Keys
2. Click **Create API Key**
3. Give it a name and select **Full Access** (or restrict to Mail Send)
4. Copy the API key (starts with `SG.`)

### Step 3: Verify Sender Identity
1. Go to Settings > Sender Authentication
2. Verify your sending domain or single sender email

### Step 4: Update .env.local
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=notifications@your-domain.com
EMAIL_FROM_NAME=Angel's Care Home Health
```

---

## SMS Setup (Twilio)

### Step 1: Create Twilio Account
1. Sign up at: https://www.twilio.com/try-twilio
2. Verify your phone number

### Step 2: Get Credentials
1. Go to Console Dashboard
2. Find your **Account SID** (starts with `AC`)
3. Find your **Auth Token**

### Step 3: Get a Phone Number
1. Go to Phone Numbers > Manage > Buy a Number
2. Choose a number with SMS capability
3. Copy the phone number

### Step 4: Update .env.local
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

## Testing the Configuration

1. Go to Admin Panel > Notifications
2. Look at the **Provider Configuration** section
3. Both Email and SMS should show **Active** (not Mock Mode)

To test:
1. Add yourself as a contact in the Contacts section
2. Go to Notifications > Compose New
3. Select yourself as recipient
4. Send a test message

---

## Troubleshooting

### "Mock Mode" still showing
- Double-check your credentials in `.env.local`
- Make sure you restarted the server: `pm2 restart angelscare`

### Gmail: "Username and Password not accepted"
- Make sure you're using an App Password, not your regular password
- Verify 2FA is enabled on your Google account

### SendGrid: "Unauthorized"
- Check that your API key is correct and starts with `SG.`
- Verify your sender identity is confirmed

### Twilio: "Unverified phone number"
- On trial accounts, you can only send to verified numbers
- Add recipient numbers in Twilio Console > Verified Caller IDs

---

## Environment Variables Reference

| Variable | Provider | Description |
|----------|----------|-------------|
| `EMAIL_PROVIDER` | All | `smtp` or `sendgrid` |
| `SMTP_HOST` | SMTP | e.g., `smtp.gmail.com` |
| `SMTP_PORT` | SMTP | Usually `587` (TLS) or `465` (SSL) |
| `SMTP_USER` | SMTP | Your email address |
| `SMTP_PASS` | SMTP | App password |
| `SENDGRID_API_KEY` | SendGrid | API key starting with `SG.` |
| `EMAIL_FROM` | All | Sender email address |
| `EMAIL_FROM_NAME` | All | Display name |
| `TWILIO_ACCOUNT_SID` | Twilio | Account SID starting with `AC` |
| `TWILIO_AUTH_TOKEN` | Twilio | Auth token |
| `TWILIO_PHONE_NUMBER` | Twilio | Your Twilio phone number |
