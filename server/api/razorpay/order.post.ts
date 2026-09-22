import Razorpay from 'razorpay'
import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { isSessionId, SESSION_CATALOGUE } from '~~/shared/utils/sessionCatalogue'
import { CalendarUnavailable, isGoogleConfigured, isSlotFree, isValidCandidateSlot } from '../../utils/googleCalendar'
import { clean, isEmail } from '../../utils/mail'

/**
 * Creates a Razorpay order for one session.
 *
 * The browser sends a session id, who is booking, and the slot they picked.
 * The price is looked up server side so nobody can pay ₹1 for a ₹1,799
 * session by editing the request. The slot is checked to be one we actually
 * offer for that session, and still free, before any money moves. Everything
 * is stored as order notes: the verify step reads the slot back from Razorpay,
 * never from the browser.
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
    recipientName?: unknown
    recipientEmail?: unknown
    slotStartIso?: unknown
    slotEndIso?: unknown
    slotDate?: unknown
    slotLabel?: unknown
  }>(event)

  if (!isSessionId(body?.sessionId)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown session.' })
  }

  const session = SESSION_CATALOGUE[body.sessionId]

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const phone = clean(body.phone, 30)
  const note = clean(body.note, 500)
  if (!name || !phone || !isEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in your name, mobile number and a valid email.' })
  }

  const isGift = session.id === 'gift-50'
  const recipientName = clean(body.recipientName, 120)
  const recipientEmail = clean(body.recipientEmail, 200)
  if (isGift && (!recipientName || !isEmail(recipientEmail))) {
    throw createError({ statusCode: 400, statusMessage: 'Please tell us who the session is for, with their email.' })
  }
  const planNote = session.id === 'checkin-monthly' ? 'Session 1 of 4' : ''

  const slotStart = clean(body.slotStartIso, 40)
  const slotEnd = clean(body.slotEndIso, 40)
  if (!isValidCandidateSlot(slotStart, slotEnd, session.durationMinutes)) {
    throw createError({ statusCode: 400, statusMessage: 'That time is not available. Please pick another slot.' })
  }

  if (!isGoogleConfigured(event)) {
    throw createError({ statusCode: 503, statusMessage: 'Online booking is not set up yet. Please book over WhatsApp.' })
  }

  // Last look before taking money: someone else may have booked it meanwhile.
  try {
    if (!(await isSlotFree(event, slotStart, slotEnd))) {
      throw createError({ statusCode: 409, statusMessage: 'Sorry, that slot was just taken. Please choose another time.' })
    }
  } catch (err) {
    if (err instanceof CalendarUnavailable) {
      throw createError({ statusCode: 503, statusMessage: 'The calendar is not reachable right now. Please try again in a moment.' })
    }
    throw err
  }

  const slotDate = slotStart.slice(0, 10)
  const slotLabel = new Date(slotStart).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })

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
        name,
        email,
        phone,
        note,
        slot_start: slotStart,
        slot_end: slotEnd,
        slot_date: slotDate,
        slot_label: slotLabel,
        is_gift: isGift ? 'yes' : 'no',
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        plan_note: planNote
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
    session: { id: session.id, title: session.title, amountInr: session.amountInr },
    slot: { startIso: slotStart, endIso: slotEnd, date: slotDate, label: slotLabel }
  }
})
