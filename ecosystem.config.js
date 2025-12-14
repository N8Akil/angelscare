/**
 * PM2 Ecosystem Configuration
 * Angel's Care Home Health Website
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 restart angelscare
 *   pm2 logs angelscare
 */

module.exports = {
  apps: [
    {
      name: 'angelscare',
      script: 'npm',
      args: 'start',
      cwd: '/mnt/extreme-pro/angelscare',

      // Environment
      env: {
        NODE_ENV: 'production',
        PORT: 3007,
      },

      // Process management
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/n8/.pm2/logs/angelscare-error.log',
      out_file: '/home/n8/.pm2/logs/angelscare-out.log',
      merge_logs: true,

      // Restart behavior
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 1000,

      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,

      // Resource limits
      node_args: '--max-old-space-size=512',
    },
  ],
}
