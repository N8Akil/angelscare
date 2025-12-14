/**
 * Notification Worker - Background Processing
 *
 * This worker processes the notification queue automatically.
 * It can be triggered in multiple ways:
 * 1. API route call (cron job)
 * 2. After composing notifications
 * 3. Interval-based polling
 */

import { processNotificationQueue, getQueueStats } from '@/lib/actions/notifications'

// Worker state
let isRunning = false
let lastRun: Date | null = null
let intervalId: NodeJS.Timeout | null = null

// Configuration
const POLL_INTERVAL = 30000 // 30 seconds
const BATCH_SIZE = 20

/**
 * Run the worker once
 */
export async function runWorker(): Promise<{
  success: boolean
  result?: Awaited<ReturnType<typeof processNotificationQueue>>
  error?: string
  lastRun: Date | null
}> {
  if (isRunning) {
    return { success: false, error: 'Worker is already running', lastRun }
  }

  isRunning = true
  try {
    const result = await processNotificationQueue(BATCH_SIZE)
    lastRun = new Date()
    return { success: true, result, lastRun }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[NotificationWorker] Error:', errorMsg)
    return { success: false, error: errorMsg, lastRun }
  } finally {
    isRunning = false
  }
}

/**
 * Start polling worker (runs on interval)
 */
export function startPolling(): { started: boolean; interval: number } {
  if (intervalId) {
    return { started: false, interval: POLL_INTERVAL }
  }

  console.log(`[NotificationWorker] Starting polling every ${POLL_INTERVAL / 1000}s`)

  intervalId = setInterval(async () => {
    // Check if there are pending items before running
    const stats = await getQueueStats()
    if (stats.pending > 0) {
      console.log(`[NotificationWorker] Found ${stats.pending} pending, processing...`)
      await runWorker()
    }
  }, POLL_INTERVAL)

  return { started: true, interval: POLL_INTERVAL }
}

/**
 * Stop polling worker
 */
export function stopPolling(): boolean {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    console.log('[NotificationWorker] Stopped polling')
    return true
  }
  return false
}

/**
 * Get worker status
 */
export function getWorkerStatus(): {
  isRunning: boolean
  isPolling: boolean
  lastRun: Date | null
  pollInterval: number
} {
  return {
    isRunning,
    isPolling: intervalId !== null,
    lastRun,
    pollInterval: POLL_INTERVAL
  }
}

/**
 * Trigger worker after composing (immediate processing)
 */
export async function triggerAfterCompose(): Promise<void> {
  // Small delay to ensure database transaction is committed
  setTimeout(async () => {
    console.log('[NotificationWorker] Triggered after compose')
    await runWorker()
  }, 1000)
}
