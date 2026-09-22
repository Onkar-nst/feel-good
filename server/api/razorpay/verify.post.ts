import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { fulfilBooking } from '../../utils/fulfilBooking'

/**
 * Confirms a payment really happened and books the slot on Google Calendar.
 *
 * Razorpay signs `order_id|payment_id` with the key secret. Once that checks
 * out in constant time, we:
 * hand over to fulfilBooking (shared with the Razorpay webhook), which
 * confirms the payment with Razorpay, books the calendar and emails.
 */
export default defineEventHandler(async (event) => {
  const { razorpayKeySecret } = useRuntimeConfig(event)
  if (!razorpayKeySecret) {
    throw createError({ statusCode: 503, statusMessage: 'Online payment is not configured yet.' })
  }

  const body = await readBody<{
    razorpay_order_id?: unknown
    razorpay_payment_id?: unknown
    razorpay_signature?: unknown
  }>(event)

  const orderId = body?.razorpay_order_id
  const paymentId = body?.razorpay_payment_id
  const signature = body?.razorpay_signature

  if (typeof orderId !== 'string' || typeof paymentId !== 'string' || typeof signature !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing payment details.' })
  }

  const expected = createHmac('sha256', razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(signature, 'utf8')
  const valid = a.length === b.length && timingSafeEqual(a, b)

  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: 'Payment could not be verified.' })
  }

  return fulfilBooking(event, orderId, paymentId)
})
