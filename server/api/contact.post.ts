import { createError, defineEventHandler, readBody } from 'h3'
import { clean, getMailer, isEmail, rowsHtml, rowsText, wrapHtml } from '../utils/mail'

/** Contact page form → email to the client's inbox. */
export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  // Honeypot: real visitors never see this field.
  if (clean(body?.website)) return { success: true }

  const name = clean(body?.name, 120)
  const phone = clean(body?.phone, 30)
  const email = clean(body?.email, 200)
  const age = clean(body?.age, 5)
  const gender = clean(body?.gender, 40)
  const message = clean(body?.message, 3000)

  if (!name || !phone || !email || !isEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill in your name, mobile number and a valid email.' })
  }

  const rows: [string, unknown][] = [
    ['Name', name], ['Mobile', phone], ['Email', email],
    ['Age', age], ['Gender', gender], ['Message', message]
  ]

  const mailer = getMailer(event)
  await mailer.notify({
    subject: `New enquiry from ${name}`,
    replyTo: email,
    html: wrapHtml('New enquiry from the website', rowsHtml(rows)),
    text: `New enquiry from the website\n\n${rowsText(rows)}`
  })

  return { success: true }
})
