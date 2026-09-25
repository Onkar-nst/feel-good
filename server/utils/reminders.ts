import { google } from 'googleapis'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import { esc, getMailer } from './mail'

/**
 * Session reminders for clients, sent about 3 hours before the slot.
 *
 * Bookings live only in Kinjal's Google Calendar, so this sweeps that
 * calendar for events we created (they carry a private `paymentId`), that
 * start within the next REMIND_BEFORE_MINUTES, and that have not been
 * reminded yet. After a successful send the event is stamped with
 * `reminderSent`, so the sweep is safe to run as often as you like.
 *
 * Run it every 10 minutes: Nitro's scheduled task (server/tasks) does that
 * on a long-running Node host, or point an external cron at
 * POST /api/booking/reminders with the NUXT_REMINDER_SECRET header.
 */
export const REMIND_BEFORE_MINUTES = 180
const TIMEZONE = 'Asia/Kolkata'
const WHATSAPP = 'https://wa.me/917400097501'

type RunResult = { checked: number, sent: string[], skipped: number, errors: string[] }

export async function sendDueReminders(event?: H3Event): Promise<RunResult> {
  const config = useRuntimeConfig(event)
  const result: RunResult = { checked: 0, sent: [], skipped: 0, errors: [] }

  if (!config.googleClientId || !config.googleClientSecret || !config.googleRefreshToken) {
    result.errors.push('Google Calendar is not configured')
    return result
  }

  const auth = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret)
  auth.setCredentials({ refresh_token: config.googleRefreshToken })
  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = config.googleCalendarId || 'primary'

  const now = new Date()
  const horizon = new Date(now.getTime() + REMIND_BEFORE_MINUTES * 60 * 1000)

  const list = await calendar.events.list({
    calendarId,
    timeMin: now.toISOString(),
    timeMax: horizon.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    privateExtendedProperty: ['reminderSent=0'],
    maxResults: 50
  })

  const items = list.data.items ?? []
  result.checked = items.length
  if (!items.length) return result

  const mailer = getMailer(event as H3Event)

  for (const ev of items) {
    const props = ev.extendedProperties?.private ?? {}
    const attendee = ev.attendees?.find(a => a.email && !a.self)
    const startIso = ev.start?.dateTime
    if (!ev.id || !attendee?.email || !startIso || ev.status === 'cancelled') {
      result.skipped++
      continue
    }

    const start = new Date(startIso)
    const when = new Intl.DateTimeFormat('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TIMEZONE
    }).format(start)
    const timeOnly = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TIMEZONE }).format(start)
    const minutesAway = Math.round((start.getTime() - now.getTime()) / 60000)
    const hoursAway = Math.max(1, Math.round(minutesAway / 60))

    const name = attendee.displayName?.split(' ')[0] || 'there'
    const sessionTitle = (ev.summary || 'your listening session').replace(/^.*?:\s*/, '')
    const meetingUrl = ev.hangoutLink || ev.conferenceData?.entryPoints?.find(ep => ep.entryPointType === 'video')?.uri || ''

    try {
      await mailer.send({
        to: attendee.email,
        subject: `Reminder: your session with Kinjal is at ${timeOnly} today`,
        text: [
          `Hi ${name},`,
          '',
          `A gentle reminder that your ${sessionTitle} with Kinjal is in about ${hoursAway} hour${hoursAway === 1 ? '' : 's'}.`,
          '',
          `When: ${when} (IST)`,
          meetingUrl ? `Join on Google Meet: ${meetingUrl}` : 'Join via the Google Meet link in your booking confirmation.',
          '',
          'Please join on time. A session that starts late still ends at the scheduled time.',
          `If something has come up, message us on WhatsApp: ${WHATSAPP}`,
          '',
          'See you soon,',
          'The Feel Good Centre'
        ].join('\n'),
        html: reminderHtml({ name, sessionTitle, when, hoursAway, meetingUrl })
      })

      await calendar.events.patch({
        calendarId,
        eventId: ev.id,
        requestBody: { extendedProperties: { private: { ...props, reminderSent: '1' } } }
      })
      result.sent.push(attendee.email)
    } catch (err) {
      console.error('[reminders] failed for event', ev.id, err)
      result.errors.push(`${ev.id}: ${(err as Error).message}`)
    }
  }

  return result
}

function reminderHtml(o: { name: string, sessionTitle: string, when: string, hoursAway: number, meetingUrl: string }) {
  const btn = o.meetingUrl
    ? `<a href="${esc(o.meetingUrl)}" target="_blank" style="display:inline-block;background:#1E4635;color:#FFFFFF;padding:13px 26px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">Join on Google Meet</a>`
    : `<p style="margin:0;color:#4b4441;font-size:14px;">Use the Google Meet link in your booking confirmation email.</p>`
  return `<div style="font-family:Inter,Arial,sans-serif;background:#fbf6f2;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;border:1px solid #efe6df">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#BC5237;font-weight:600">Session reminder</p>
      <h2 style="margin:0 0 16px;font-weight:600;color:#1c1614;font-size:22px">Hi ${esc(o.name)}, your session is in about ${o.hoursAway} hour${o.hoursAway === 1 ? '' : 's'}</h2>
      <p style="margin:0 0 18px;color:#4b4441;font-size:15px;line-height:1.6">A gentle reminder that your <strong>${esc(o.sessionTitle)}</strong> with Kinjal is coming up.</p>
      <table style="border-collapse:collapse;margin-bottom:22px;font-size:14px;color:#1c1614">
        <tr><td style="padding:6px 16px 6px 0;color:#9a918d">When</td><td style="padding:6px 0;font-weight:500">${esc(o.when)} (IST)</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#9a918d">Where</td><td style="padding:6px 0;font-weight:500">Google Meet, video call</td></tr>
      </table>
      <div style="margin-bottom:22px">${btn}</div>
      <p style="margin:0 0 8px;color:#4b4441;font-size:13px;line-height:1.6">Please join on time. A session that starts late still ends at the scheduled time.</p>
      <p style="margin:0;color:#4b4441;font-size:13px;line-height:1.6">If something has come up, <a href="${WHATSAPP}" style="color:#1E4635">message us on WhatsApp</a>.</p>
      <p style="color:#9a918d;font-size:12px;margin:20px 0 0">The Feel Good Centre · thefeelgoodcenter.in</p>
    </div>
  </div>`
}
