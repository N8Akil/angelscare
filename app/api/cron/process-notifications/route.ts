import { NextResponse } from 'next/server'
import { processNotificationQueue, getQueueStats, getNotificationProviderStatus } from '@/lib/actions/notifications'
import { runWorker, getWorkerStatus, startPolling, stopPolling } from '@/lib/notifications/worker'

// Secret for cron authentication (set in environment)
const CRON_SECRET = process.env.CRON_SECRET || 'angelscare-cron-secret'

export const dynamic = 'force-dynamic'

/**
 * Process notification queue
 *
 * Usage:
 * - Process queue: POST /api/cron/process-notifications
 * - Start polling: POST /api/cron/process-notifications?action=start-polling
 * - Stop polling: POST /api/cron/process-notifications?action=stop-polling
 *
 * Headers:
 * - Authorization: Bearer <CRON_SECRET>
 */
export async function POST(request: Request) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const batchSize = parseInt(searchParams.get('batch') || '20', 10)

    // Handle different actions
    switch (action) {
      case 'start-polling': {
        const pollResult = startPolling()
        return NextResponse.json({
          success: true,
          action: 'start-polling',
          ...pollResult,
          timestamp: new Date().toISOString()
        })
      }

      case 'stop-polling': {
        const stopped = stopPolling()
        return NextResponse.json({
          success: stopped,
          action: 'stop-polling',
          timestamp: new Date().toISOString()
        })
      }

      default: {
        // Default: process queue immediately
        const result = await processNotificationQueue(batchSize)
        return NextResponse.json({
          success: true,
          ...result,
          timestamp: new Date().toISOString()
        })
      }
    }
  } catch (error) {
    console.error('Cron process-notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to process notifications' },
      { status: 500 }
    )
  }
}

/**
 * GET for status and health check
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (token !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [queueStats, providerStatus, workerStatus] = await Promise.all([
      getQueueStats(),
      getNotificationProviderStatus(),
      Promise.resolve(getWorkerStatus())
    ])

    return NextResponse.json({
      status: 'ok',
      endpoint: '/api/cron/process-notifications',
      queue: queueStats,
      providers: providerStatus,
      worker: workerStatus,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Failed to get status' },
      { status: 500 }
    )
  }
}
