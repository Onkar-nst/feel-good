import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import Razorpay from 'razorpay'
import { getMailer, rowsHtml, rowsText, wrapHtml } from '../../utils/mail'

/**
 * Confirms a payment really happened.
 *
 * Razorpay signs `order_id|payment_id` with the key secret. Anyone can call
 * the checkout's success handler from devtools, so the browser is never
 * trusted: we recompute the signature here and compare in constant time.
 */
export default defineEventHandler(async (event) => {
  const { razorpayKeyId, razorpayKeySecret } = useRuntimeConfig(event)
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

  // Payment is real. Tell the client, and send the visitor a receipt. Email
  // trouble must never turn a successful payment into an error screen, so
  // this is best effort and only logged.
  try {
    await notifyBooking(event, razorpayKeyId, razorpayKeySecret, orderId, paymentId)
  } catch (err) {
    console.error('[razorpay] booking email failed', err)
  }

  return { success: true, paymentId, orderId }
})

async function notifyBooking(
  event: Parameters<typeof getMailer>[0],
  keyId: string,
  keySecret: string,
  orderId: string,
  paymentId: string
) {
  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
  const order = await razorpay.orders.fetch(orderId)
  const notes = (order.notes ?? {}) as Record<string, string>
  const amount = `₹${(Number(order.amount) / 100).toLocaleString('en-IN')}`

  const rows: [string, unknown][] = [
    ['Session', notes.session], ['Amount paid', amount],
    ['Name', notes.name], ['Email', notes.email], ['Mobile', notes.phone],
    ['Note', notes.note], ['Payment ID', paymentId], ['Order ID', orderId]
  ]

  const mailer = getMailer(event)

  await mailer.notify({
    subject: `Paid booking: ${notes.session || 'session'} from ${notes.name || 'a visitor'}`,
    replyTo: notes.email || undefined,
    html: wrapHtml('New paid booking', `${rowsHtml(rows)}<p style="color:#6b6360;font-size:13px;margin-top:14px">They were sent to Cal.com to pick a time. If no slot appears, reach out on the number above.</p>`),
    text: `New paid booking\n\n${rowsText(rows)}\n\nThey were sent to Cal.com to pick a time.`
  })

  if (notes.email) {
    const receiptRows: [string, unknown][] = [
      ['Session', notes.session], ['Amount paid', amount], ['Payment ID', paymentId]
    ]
    await mailer.send({
      to: notes.email,
      subject: `Your session is paid for. ${notes.session || ''}`.trim(),
      html: wrapHtml(`Thank you, ${notes.name || 'friend'}`,
        `<p style="color:#1c1614">Your payment went through. If you have not picked a time yet, reply to this email or message us on WhatsApp and we will fix a slot together.</p>${rowsHtml(receiptRows)}`),
      text: `Thank you, ${notes.name || 'friend'}.\n\nYour payment went through. If you have not picked a time yet, reply to this email or message us on WhatsApp.\n\n${rowsText(receiptRows)}`
    })
  }
}
