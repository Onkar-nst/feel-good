import { google } from 'googleapis'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

export type Slot = {
  date: string       // e.g. "2026-09-22"
  time: string       // e.g. "14:00"
  label: string      // e.g. "2:00 PM"
  period: 'morning' | 'afternoon' | 'evening'
  startIso: string
  endIso: string
}

export type DayAvailability = {
  date: string       // "YYYY-MM-DD"
  dayName: string    // "TUE"
  dayNum: string     // "22"
  month: string      // "Sep"
  slotCount: number
  isAvailable: boolean
  isToday: boolean
}

export type BookingEventData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerNote?: string
  sessionTitle: string
  startIso: string
  endIso: string
  paymentId: string
  amountInr: number
}

// Operating hours in Asia/Kolkata (+05:30)
const TIMEZONE = 'Asia/Kolkata'
const WORK_START_HOUR = 10 // 10:00 AM
const WORK_LAST_SLOT_HOUR = 19 // 7:00 PM (last slot starts at 7:00 PM)
const BUFFER_MINUTES = 15

import fs from 'node:fs'
import path from 'node:path'

function getGoogleCredentials(event: H3Event) {
  const config = useRuntimeConfig(event)
  let clientId = config.googleClientId || process.env.NUXT_GOOGLE_CLIENT_ID
  let clientSecret = config.googleClientSecret || process.env.NUXT_GOOGLE_CLIENT_SECRET
  let refreshToken = config.googleRefreshToken || process.env.NUXT_GOOGLE_REFRESH_TOKEN
  let calendarId = config.googleCalendarId || process.env.NUXT_GOOGLE_CALENDAR_ID || 'primary'

  // Dynamic fallback: read directly from .env file on disk if runtimeConfig didn't have them
  if (!clientId || !clientSecret || !refreshToken) {
    try {
      const envPath = path.resolve(process.cwd(), '.env')
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8')
        for (const line of envContent.split('\n')) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) continue
          const eqIdx = trimmed.indexOf('=')
          if (eqIdx === -1) continue
          const key = trimmed.slice(0, eqIdx).trim()
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
          if (key === 'NUXT_GOOGLE_CLIENT_ID' && !clientId) clientId = val
          if (key === 'NUXT_GOOGLE_CLIENT_SECRET' && !clientSecret) clientSecret = val
          if (key === 'NUXT_GOOGLE_REFRESH_TOKEN' && !refreshToken) refreshToken = val
          if (key === 'NUXT_GOOGLE_CALENDAR_ID' && calendarId === 'primary') calendarId = val
        }
      }
    } catch (e) {
      console.warn('[GoogleCalendar] Failed to read .env file dynamically:', e)
    }
  }

  return { clientId, clientSecret, refreshToken, calendarId }
}

function getGoogleAuth(event: H3Event) {
  const { clientId, clientSecret, refreshToken } = getGoogleCredentials(event)

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn('[GoogleCalendar] Missing Google credentials in runtime config and .env')
    return null
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret
  )
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  return oauth2Client
}

/**
 * Parses date string (YYYY-MM-DD) into Date boundaries in Asia/Kolkata
 */
function getDayBounds(dateStr: string) {
  const start = new Date(`${dateStr}T00:00:00+05:30`)
  const end = new Date(`${dateStr}T23:59:59+05:30`)
  return { start, end }
}

/**
 * Generates candidate time slots within working hours (10:00 AM to 7:00 PM) for a given duration.
 * Available every day including Sunday.
 */
function generateCandidateSlots(dateStr: string, durationMinutes: number): Slot[] {
  const slots: Slot[] = []
  // Clean scheduling intervals: 60 mins for 30/50 min sessions, 90 mins for 75 min sessions
  const stepMinutes = durationMinutes > 50 ? 90 : 60

  let currentHour = WORK_START_HOUR
  let currentMinute = 0

  while (true) {
    const slotStartMinTotal = currentHour * 60 + currentMinute
    const slotEndMinTotal = slotStartMinTotal + durationMinutes
    const lastSlotStartMinTotal = WORK_LAST_SLOT_HOUR * 60

    if (slotStartMinTotal > lastSlotStartMinTotal) break

    const h = Math.floor(slotStartMinTotal / 60)
    const m = slotStartMinTotal % 60
    const endH = Math.floor(slotEndMinTotal / 60)
    const endM = slotEndMinTotal % 60

    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`

    const period: Slot['period'] = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'

    // Formatted 12h label e.g. "1:00 PM"
    const h12 = h % 12 || 12
    const ampm = h < 12 ? 'AM' : 'PM'
    const label = `${h12}:${String(m).padStart(2, '0')} ${ampm}`

    slots.push({
      date: dateStr,
      time: timeStr,
      label,
      period,
      startIso: `${dateStr}T${timeStr}:00+05:30`,
      endIso: `${dateStr}T${endTimeStr}:00+05:30`
    })

    currentMinute += stepMinutes
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60)
      currentMinute = currentMinute % 60
    }
  }

  return slots
}

/**
 * Queries Google Calendar Free/Busy intervals for a time range
 */
async function queryGoogleBusy(event: H3Event, startIso: string, endIso: string): Promise<{ start: Date, end: Date }[]> {
  const auth = getGoogleAuth(event)
  if (!auth) return []

  const config = useRuntimeConfig(event)
  const calendarId = config.googleCalendarId || 'primary'
  const calendar = google.calendar({ version: 'v3', auth })

  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: startIso,
        timeMax: endIso,
        timeZone: TIMEZONE,
        items: [{ id: calendarId }]
      }
    })

    const busyList = res.data.calendars?.[calendarId]?.busy || []
    return busyList.map(b => ({
      start: new Date(b.start!),
      end: new Date(b.end!)
    }))
  } catch (err) {
    console.error('[GoogleCalendar] freebusy query error:', err)
    return []
  }
}

/**
 * Retrieves available slots for a single date, filtering out busy periods and past times.
 */
export async function getAvailableSlots(event: H3Event, dateStr: string, durationMinutes = 50) {
  const candidates = generateCandidateSlots(dateStr, durationMinutes)
  if (candidates.length === 0) {
    return {
      date: dateStr,
      slots: [],
      morningSlots: [],
      afternoonSlots: [],
      eveningSlots: [],
      totalSlots: 0
    }
  }

  const { start, end } = getDayBounds(dateStr)
  const busyRanges = await queryGoogleBusy(event, start.toISOString(), end.toISOString())

  // Current time in IST + 90 minute minimum notice
  const now = new Date()
  const minNoticeTime = new Date(now.getTime() + 90 * 60 * 1000)

  const freeSlots = candidates.filter(slot => {
    const slotStart = new Date(slot.startIso)
    const slotEnd = new Date(slot.endIso)

    // Cannot book in the past
    if (slotStart < minNoticeTime) return false

    // Check collision with any busy block
    for (const busy of busyRanges) {
      if (slotStart < busy.end && slotEnd > busy.start) {
        return false // overlaps
      }
    }
    return true
  })

  return {
    date: dateStr,
    slots: freeSlots,
    morningSlots: freeSlots.filter(s => s.period === 'morning'),
    afternoonSlots: freeSlots.filter(s => s.period === 'afternoon'),
    eveningSlots: freeSlots.filter(s => s.period === 'evening'),
    totalSlots: freeSlots.length
  }
}

/**
 * Retrieves 7-14 day availability overview for the date carousel.
 */
export async function getMultiDayAvailability(event: H3Event, startDateStr: string, numDays = 7, durationMinutes = 50): Promise<DayAvailability[]> {
  const days: DayAvailability[] = []
  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: TIMEZONE }) // YYYY-MM-DD in IST

  // Start date
  const start = new Date(`${startDateStr}T12:00:00+05:30`)

  // Pre-fetch all busy intervals for the full range in one API call
  const rangeStart = new Date(start)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(start)
  rangeEnd.setDate(rangeEnd.getDate() + numDays)
  rangeEnd.setHours(23, 59, 59, 999)

  const busyRanges = await queryGoogleBusy(event, rangeStart.toISOString(), rangeEnd.toISOString())
  const now = new Date()
  const minNoticeTime = new Date(now.getTime() + 90 * 60 * 1000)

  for (let i = 0; i < numDays; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dateStr = d.toLocaleDateString('en-CA', { timeZone: TIMEZONE })

    const dayName = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: TIMEZONE }).toUpperCase()
    const dayNum = d.toLocaleDateString('en-US', { day: 'numeric', timeZone: TIMEZONE })
    const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: TIMEZONE })


    const candidates = generateCandidateSlots(dateStr, durationMinutes)
    const validSlots = candidates.filter(slot => {
      const slotStart = new Date(slot.startIso)
      const slotEnd = new Date(slot.endIso)
      if (slotStart < minNoticeTime) return false
      for (const busy of busyRanges) {
        if (slotStart < busy.end && slotEnd > busy.start) return false
      }
      return true
    })

    days.push({
      date: dateStr,
      dayName,
      dayNum,
      month,
      slotCount: validSlots.length,
      isAvailable: validSlots.length > 0,
      isToday: dateStr === todayStr
    })
  }

  return days
}

/**
 * Creates confirmed Google Calendar Event with Google Meet conference data.
 */
export async function createCalendarBooking(event: H3Event, data: BookingEventData) {
  const auth = getGoogleAuth(event)
  const { calendarId } = getGoogleCredentials(event)

  const eventTitle = `Listening Session: ${data.customerName} (${data.sessionTitle})`
  const eventDescription = [
    `The Feel Good Centre — 1:1 Virtual Listening Session`,
    ``,
    `Client: ${data.customerName}`,
    `Phone: ${data.customerPhone}`,
    `Email: ${data.customerEmail}`,
    `Session: ${data.sessionTitle}`,
    `Amount Paid: ₹${data.amountInr.toLocaleString('en-IN')}`,
    `Payment ID: ${data.paymentId}`,
    data.customerNote ? `Client Note: "${data.customerNote}"` : '',
    ``,
    `Confidential & Judgment-Free Space.`
  ].filter(Boolean).join('\n')

  if (!auth) {
    console.warn('[GoogleCalendar] Google OAuth credentials not configured. Please run node scripts/setup-google-oauth.mjs')
    return {
      eventId: `pending-${Date.now()}`,
      meetingUrl: '',
      calendarEventUrl: null
    }
  }

  const calendar = google.calendar({ version: 'v3', auth })

  try {
    const insertRes = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // sends Google Calendar invite & updates to client and host
      requestBody: {
        summary: eventTitle,
        description: eventDescription,
        start: {
          dateTime: data.startIso,
          timeZone: TIMEZONE
        },
        end: {
          dateTime: data.endIso,
          timeZone: TIMEZONE
        },
        attendees: [
          { email: data.customerEmail, displayName: data.customerName }
        ],
        conferenceData: {
          createRequest: {
            requestId: `fgc-${data.paymentId}-${Date.now()}`.slice(0, 40),
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 15 }
          ]
        }
      }
    })

    const created = insertRes.data
    const meetingUrl =
      created.hangoutLink ||
      created.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri || ''

    return {
      eventId: created.id || '',
      meetingUrl,
      calendarEventUrl: created.htmlLink || null
    }
  } catch (err) {
    console.error('[GoogleCalendar] Event creation failed:', err)
    return {
      eventId: `fallback-${Date.now()}`,
      meetingUrl: '',
      calendarEventUrl: null
    }
  }
}
