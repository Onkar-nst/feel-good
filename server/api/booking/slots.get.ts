import { createError, defineEventHandler, getQuery } from 'h3'
import { CalendarUnavailable, getAvailableSlots, getMultiDayAvailability, isGoogleConfigured } from '../../utils/googleCalendar'
import { isSessionId, SESSION_CATALOGUE } from '~~/shared/utils/sessionCatalogue'

/**
 * Free slots for the picker. Duration comes from the session id so the slots
 * offered always match what the order route will accept.
 */
export default defineEventHandler(async (event) => {
  if (!isGoogleConfigured(event)) {
    throw createError({ statusCode: 503, statusMessage: 'Online booking is not set up yet. Please book over WhatsApp.' })
  }

  const query = getQuery(event)

  const todayIst = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const date = typeof query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(query.date)
    ? query.date
    : todayIst

  // The carousel window is anchored separately from the selected day, so
  // picking a later date never hides the earlier ones.
  const from = typeof query.from === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(query.from) && query.from >= todayIst
    ? query.from
    : todayIst
  const daysCount = Math.min(Math.max(Number(query.days) || 7, 3), 30)
  const duration = isSessionId(query.sessionId)
    ? SESSION_CATALOGUE[query.sessionId].durationMinutes
    : 50

  try {
    const [days, daySlots] = await Promise.all([
      getMultiDayAvailability(event, from, daysCount, duration),
      getAvailableSlots(event, date, duration)
    ])

    return {
      activeDate: date,
      days,
      slots: {
        all: daySlots.slots,
        morning: daySlots.morningSlots,
        afternoon: daySlots.afternoonSlots,
        evening: daySlots.eveningSlots,
        total: daySlots.totalSlots
      }
    }
  } catch (err) {
    if (err instanceof CalendarUnavailable) {
      throw createError({ statusCode: 503, statusMessage: 'The calendar is not reachable right now. Please try again in a moment or book over WhatsApp.' })
    }
    throw err
  }
})
