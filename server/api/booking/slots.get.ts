import { defineEventHandler, getQuery } from 'h3'
import { getAvailableSlots, getMultiDayAvailability } from '../../utils/googleCalendar'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const todayIst = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const date = typeof query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(query.date)
    ? query.date
    : todayIst

  const daysCount = Math.min(Math.max(Number(query.days) || 7, 3), 14)
  const duration = Math.min(Math.max(Number(query.duration) || 50, 15), 120)

  // Fetch carousel overview & specific slots for the selected date
  const [days, daySlots] = await Promise.all([
    getMultiDayAvailability(event, date, daysCount, duration),
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
})
