# Angel's Care - Manual Setup Instructions

**Last Updated:** December 10, 2025
**Status:** Post-rebuild configuration required

---

## Quick Start Deployment

### Step 1: Apply Database Indexes (One-time, for performance)

```bash
PGPASSWORD=postgres psql -U postgres -d angelscare -f /mnt/extreme-pro/angelscare/scripts/002_add_production_indexes.sql
```

### Step 2: Build and Start with PM2

```bash
cd /mnt/extreme-pro/angelscare
npm run build
pm2 start ecosystem.config.js
pm2 save
```

Or if already running:
```bash
pm2 restart angelscare
```

### Step 3: Configure Nginx (Option A - Direct)

```bash
sudo cp /mnt/extreme-pro/angelscare/nginx/angelscare.conf /etc/nginx/sites-available/angelscare
sudo ln -s /etc/nginx/sites-available/angelscare /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Step 3: Configure Cloudflare Tunnel (Option B - Recommended)

Add to tunnel config (`~/.cloudflared/config.yml`):
```yaml
ingress:
  - hostname: angelscare-homehealth.com
    service: http://127.0.0.1:3007
  - hostname: www.angelscare-homehealth.com
    service: http://127.0.0.1:3007
```

Then restart tunnel:
```bash
pm2 restart enclave-tunnel
# OR: cloudflared tunnel run
```

### Step 4: Verify Deployment

```bash
curl -I http://localhost:3007
# Should return HTTP 200
```

---

## 1. Notification Provider Configuration

The notification system supports real email and SMS delivery. Configure these after the site rebuild is complete.

### Email: SendGrid (Recommended)

1. **Create SendGrid Account**
   - Sign up at https://sendgrid.com
   - Verify your email

2. **Generate API Key**
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the key (shown only once)

3. **Verify Sender Domain** (for production)
   - Go to Settings → Sender Authentication
   - Add and verify your domain (angelscare-homehealth.com)

4. **Add to `.env.local`**
   ```bash
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=noreply@angelscare-homehealth.com
   ```

### Email: SMTP Alternative (Gmail, etc.)

1. **For Gmail:**
   - Enable 2-Factor Authentication
   - Generate App Password: Google Account → Security → App Passwords

2. **Add to `.env.local`**
   ```bash
   EMAIL_PROVIDER=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

### SMS: Twilio

1. **Create Twilio Account**
   - Sign up at https://twilio.com
   - Verify your phone number

2. **Get Credentials**
   - Dashboard shows Account SID and Auth Token
   - Buy a phone number (or use trial number)

3. **Add to `.env.local`**
   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_PHONE_NUMBER=+13145551234
   ```

### Cron Secret

Set a secure random string for API authentication:
```bash
CRON_SECRET=your-secure-random-string-here
```

Generate one with: `openssl rand -hex 32`

---

## 2. Notification Worker Setup

Choose ONE of these methods to process the notification queue:

### Option A: Cron Job (Recommended for Production)

Add to crontab (`crontab -e`):
```bash
# Process notifications every minute
* * * * * curl -s -X POST http://localhost:3007/api/cron/process-notifications -H "Authorization: Bearer YOUR_CRON_SECRET" > /dev/null 2>&1
```

### Option B: Start Polling Worker

Run once after server starts:
```bash
curl -X POST "http://localhost:3007/api/cron/process-notifications?action=start-polling" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

This polls every 30 seconds while the server is running.

### Option C: Manual Trigger

Process queue on-demand:
```bash
curl -X POST http://localhost:3007/api/cron/process-notifications \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 3. Domain & DNS Configuration

### Cloudflare Tunnel Setup

1. **Add hostname to tunnel config**
   - Domain: angelscare-homehealth.com
   - Service: http://127.0.0.1:3007

2. **DNS Records** (if not using tunnel)
   - A record: @ → server IP
   - CNAME: www → @

### SSL Certificate

Cloudflare handles SSL automatically when using their tunnel or proxy.

---

## 4. Database Backup

Set up automatic backups:

```bash
# Add to crontab
0 2 * * * pg_dump -U postgres angelscare > /mnt/extreme-pro/backups/angelscare-$(date +\%Y\%m\%d).sql
```

---

## 5. PM2 Production Setup

Ensure PM2 restarts on server reboot:

```bash
pm2 startup
pm2 save
```

---

## 6. Environment Variables Summary

Complete `.env.local` template:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/angelscare

# Authentication
JWT_SECRET=your-secure-jwt-secret-change-in-production

# Application
NODE_ENV=production

# Email Provider (choose one)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxx
EMAIL_FROM=noreply@angelscare-homehealth.com

# OR for SMTP:
# EMAIL_PROVIDER=smtp
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=email@gmail.com
# SMTP_PASS=app-password

# SMS Provider
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+13145551234

# Cron/Worker Authentication
CRON_SECRET=your-secure-cron-secret
```

---

## 7. Testing Providers

### Check Provider Status

```bash
curl http://localhost:3007/api/cron/process-notifications \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Response shows:
```json
{
  "providers": {
    "email": { "configured": true, "provider": "sendgrid" },
    "sms": { "configured": true, "provider": "twilio" }
  }
}
```

### Send Test Notification

1. Go to Admin → Notifications → Compose
2. Select channel (Email or SMS)
3. Select test recipient
4. Send notification
5. Check queue status and PM2 logs

---

## 8. Troubleshooting

### Notifications Not Sending

1. Check provider status (see above)
2. Check PM2 logs: `pm2 logs angelscare`
3. Verify environment variables are set
4. Test API key directly with provider

### Email Going to Spam

1. Verify sender domain in SendGrid
2. Add SPF/DKIM records to DNS
3. Use professional "from" address

### SMS Not Delivered

1. Verify Twilio account is funded
2. Check phone number format (E.164: +1XXXXXXXXXX)
3. Verify recipient hasn't blocked the number

---

**Document Status:** Ready for post-rebuild configuration
