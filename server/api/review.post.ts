import { createError, defineEventHandler, readBody } from 'h3'
import { clean, getMailer, isEmail, rowsHtml, rowsText, wrapHtml } from '../utils/mail'

/** Home page review form → email to the client's inbox. */
export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  if (clean(body?.website)) return { success: true }

  const rating = Number(body?.rating)
  const title = clean(body?.title, 160)
  const review = clean(body?.review, 3000)
  const name = clean(body?.name, 120)
  const email = clean(body?.email, 200)
  const consent = body?.consent === true

  if (!rating || rating < 1 || rating > 5 || !review || !name) {
    throw createError({ statusCode: 400, statusMessage: 'Please add a rating, your review and your name.' })
  }
  if (email && !isEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'That email address does not look right.' })
  }
  if (!consent) {
    throw createError({ statusCode: 400, statusMessage: 'Please confirm the review is your own experience.' })
  }

  const rows: [string, unknown][] = [
    ['Rating', `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`],
    ['Title', title], ['Review', review], ['Name', name], ['Email', email]
  ]

  const mailer = getMailer(event)
  await mailer.notify({
    subject: `New ${rating}-star review from ${name}`,
    replyTo: email || undefined,
    html: wrapHtml('New review from the website', rowsHtml(rows)),
    text: `New review from the website\n\n${rowsText(rows)}`
  })

  return { success: true }
})
