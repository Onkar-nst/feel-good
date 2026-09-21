import Razorpay from 'razorpay'
import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { isSessionId, SESSION_CATALOGUE } from '~~/shared/utils/sessionCatalogue'

/**
 * Creates a Razorpay order for one session.
 *
 * The browser sends only a session id and who is booking. The price is looked
 * up server side so nobody can pay ₹1 for a ₹1,799 session by editing the
 * request. The customer details ride along as order notes so they show up
 * against the payment in the Razorpay dashboard.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const keyId = config.razorpayKeyId
  const keySecret = config.razorpayKeySecret

  if (!keyId || !keySecret) {
    throw createError({ statusCode: 503, statusMessage: 'Online payment is not configured yet.' })
  }

  const body = await readBody<{
    sessionId?: unknown
    name?: unknown
    email?: unknown
    phone?: unknown
    note?: unknown
  }>(event)

  if (!isSessionId(body?.sessionId)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown session.' })
  }

  const session = SESSION_CATALOGUE[body.sessionId]
  const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })

  let order
  try {
    order = await razorpay.orders.create({
      amount: session.amountInr * 100, // paise
      currency: 'INR',
      receipt: `${session.id}-${Date.now()}`.slice(0, 40),
      notes: {
        session: session.title,
        session_id: session.id,
        name: str(body.name),
        email: str(body.email),
        phone: str(body.phone, 30),
        note: str(body.note, 500)
      }
    })
  } catch (err) {
    // Wrong keys, Razorpay down, network. Log the detail, tell the visitor
    // something they can act on, and never charge anything.
    console.error('[razorpay] order creation failed', err)
    throw createError({
      statusCode: 502,
      statusMessage: 'We could not start the payment just now. Please try again in a moment, or book over WhatsApp.'
    })
  }

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
    session: { id: session.id, title: session.title, amountInr: session.amountInr }
  }
})
