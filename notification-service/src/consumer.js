const redis = require("./config/redis")
const { sendOrderConfirmation } = require("./services/mail.service")

const STREAM = "order_stream"
const GROUP = "notification_group"
const CONSUMER = "mail_worker_1"
const DLQ = "order_stream_dlq"
const RETRY_KEY_PREFIX = "retry_count:"
const PENDING_IDLE_MS = 60_000 // consider pending entries idle after 60s
const MAX_RETRIES = 5

async function initGroup() {
  try {
    await redis.xgroup("CREATE", STREAM, GROUP, "$", "MKSTREAM")
  } catch (_) {
    // group already exists
  }
}

function parseFields(fields) {
  const data = {}

  for (let i = 0; i < fields.length; i += 2) {
    data[fields[i]] = fields[i + 1]
  }

  // 🔥 IMPORTANT: items string → array
  if (data.items) {
    data.items = JSON.parse(data.items)
  }

  return data
}

async function startConsumer() {
  await initGroup()
  console.log("📨 Notification service started")
  // Periodically try to claim stale pending entries before reading new ones
  while (true) {
    try {
      await handlePendingEntries()

      const response = await redis.xreadgroup(
        "GROUP", GROUP, CONSUMER,
        "BLOCK", 5000,
        "COUNT", 1,
        "STREAMS", STREAM, ">"
      )

      if (!response) continue

      const [, messages] = response[0]

      for (const [id, fields] of messages) {
        await processMessage(id, fields)
      }
    } catch (err) {
      console.error("Consumer loop error", err.message)
      // small delay on unexpected errors
      await new Promise(r => setTimeout(r, 1000))
    }
  }
}

async function handlePendingEntries() {
  // Get up to 10 pending entries (oldest first)
  const pending = await redis.xpending(STREAM, GROUP, "-", "+", 10)

  if (!pending || pending.length === 0) return

  for (const entry of pending) {
    // entry: [id, consumer, idleMs, deliveries]
    const [id, , idleMs] = entry
    if (Number(idleMs) < PENDING_IDLE_MS) continue

    try {
      const claimed = await redis.xclaim(STREAM, GROUP, CONSUMER, PENDING_IDLE_MS, id)
      // xclaim returns [[id, [field, val...]]]
      for (const [claimedId, fields] of claimed) {
        await processMessage(claimedId, fields, true)
      }
    } catch (err) {
      console.error("Failed to claim pending id", id, err.message)
    }
  }
}

async function processMessage(id, fields, fromClaim = false) {
  const order = parseFields(fields)

  try {
    await sendOrderConfirmation(order)
    await redis.xack(STREAM, GROUP, id)
    // cleanup retry count
    try { await redis.del(RETRY_KEY_PREFIX + id) } catch (_) {}
    console.log("✅ Mail sent for order:", order.orderNumber)
  } catch (err) {
    console.error("❌ Mail failed for id", id, err.message)

    // increment retry counter
    const retryKey = RETRY_KEY_PREFIX + id
    const attempts = await redis.incr(retryKey)
    await redis.expire(retryKey, 60 * 60 * 24) // keep retry info for 24h

    if (attempts >= MAX_RETRIES) {
      console.log("⛔ Moving to DLQ", id, "after", attempts, "attempts")
      // re-add to a DLQ stream with original fields + meta
      const dlqFields = [...fields, "_original_id", id, "_failed_reason", err.message]
      await redis.xadd(DLQ, "*", ...dlqFields)
      await redis.xack(STREAM, GROUP, id)
      await redis.del(retryKey)
    } else if (fromClaim) {
      // If this was a claimed message, leave it pending so other consumers don't pick it immediately.
      // We could also XCLAIM with smaller idle time; for simplicity, do nothing here.
    }
  }
}

module.exports = startConsumer
