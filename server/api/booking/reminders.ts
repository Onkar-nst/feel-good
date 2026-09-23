import { createError, defineEventHandler, getHeader, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'
import { sendDueReminders } from '../../utils/reminders'

/**
 * Entry point for the reminder sweep, called by an external cron every
 * 10 minutes (the site runs on Vercel Hobby, which cannot schedule this
 * itself). Accepts GET or POST. The secret may come as
 *   Authorization: Bearer <NUXT_REMINDER_SECRET>
 *   x-reminder-secret: <NUXT_REMINDER_SECRET>
 *   ?secret=<NUXT_REMINDER_SECRET>
 */
export default defineEventHandler(async (event) => {
  const { reminderSecret } = useRuntimeConfig(event)
  if (!reminderSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Reminders are not configured yet.' })
  }
  const bearer = (getHeader(event, 'authorization') || '').replace(/^Bearer\s+/i, '')
  const given = bearer || getHeader(event, 'x-reminder-secret') || String(getQuery(event).secret || '')
  if (given !== reminderSecret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorised.' })
  }
  return sendDueReminders(event)
})
