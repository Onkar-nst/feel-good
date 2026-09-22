import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, defineEventHandler, getHeader, readRawBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { fulfilBooking } from '../../utils/fulfilBooking'

/**
 * Razorpay → us. Fires on payment.captured even when the visitor's browser
 * closed or lost connection before calling /verify, so a paid slot is never
 * silently lost. Set the same secret in Razorpay Dashboard → Webhooks and in
 * NUXT_RAZORPAY_WEBHOOK_SECRET. Idempotent: a payment already booked by
 * /verify is recognised and not booked again.
 */
export default defineEventHandler(async (event) => {
  const { razorpayWebhookSecret } = useRuntimeConfig(event)
  if (!razorpayWebhookSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Webhook not configured.' })
  }

  const raw = await readRawBody(event, 'utf8')
  const signature = getHeader(event, 'x-razorpay-signature') || ''
  if (!raw || !signature) {
    throw createError({ statusCode: 400, statusMessage: 'Missing body or signature.' })
  }

  const expected = createHmac('sha256', razorpayWebhookSecret).update(raw).digest('hex')
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(signature, 'utf8')
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 400, statusMessage: 'Bad signature.' })
  }

  let payload: { event?: string, payload?: { payment?: { entity?: { id?: string, order_id?: string } } } }
  try {
    payload = JSON.parse(raw)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Bad JSON.' })
  }

  if (payload.event !== 'payment.captured') {
    return { ignored: payload.event }
  }

  const paymentId = payload.payload?.payment?.entity?.id
  const orderId = payload.payload?.payment?.entity?.order_id
  if (!paymentId || !orderId) {
    return { ignored: 'no payment/order id' }
  }

  try {
    const result = await fulfilBooking(event, orderId, paymentId)
    return { ok: true, alreadyBooked: result.alreadyBooked }
  } catch (err) {
    // Log and return 500 so Razorpay retries later rather than dropping it.
    console.error('[webhook] fulfilment failed', err)
    throw createError({ statusCode: 500, statusMessage: 'Fulfilment failed.' })
  }
})
