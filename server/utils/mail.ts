import nodemailer from 'nodemailer'
import { createError, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

/**
 * One Gmail transporter for every email the site sends.
 *
 * Auth is a Gmail App Password (not the account password), read from
 * NUXT_GMAIL_USER / NUXT_GMAIL_APP_PASSWORD. Notifications go to
 * NUXT_NOTIFY_EMAIL, which defaults to the sending address.
 */
export function getMailer(event: H3Event) {
  const { gmailUser, gmailAppPassword, notifyEmail } = useRuntimeConfig(event)
  if (!gmailUser || !gmailAppPassword) {
    throw createError({ statusCode: 503, statusMessage: 'Email is not configured yet.' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword }
  })

  const from = `"The Feel Good Centre" <${gmailUser}>`
  const to = notifyEmail || gmailUser

  return {
    /** Sends to the client's inbox. `replyTo` lets them hit reply to answer the visitor. */
    notify: (opts: { subject: string, html: string, text: string, replyTo?: string }) =>
      transporter.sendMail({ from, to, ...opts }),
    /** Sends to a visitor (booking receipts). */
    send: (opts: { to: string, subject: string, html: string, text: string }) =>
      transporter.sendMail({ from, replyTo: to, ...opts })
  }
}

export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** A small, mail-client-safe table of label/value rows. */
export function rowsHtml(rows: [string, unknown][]): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `<tr><td style="padding:8px 12px;color:#6b6360;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px;color:#1c1614;font-size:15px;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')
  return `<table style="border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden">${body}</table>`
}

export function rowsText(rows: [string, unknown][]): string {
  return rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
}

export function wrapHtml(title: string, inner: string): string {
  return `<div style="font-family:Inter,Arial,sans-serif;background:#fbf6f2;padding:24px">
    <div style="max-width:560px;margin:0 auto">
      <h2 style="font-weight:600;color:#1c1614;margin:0 0 16px">${esc(title)}</h2>
      ${inner}
      <p style="color:#9a918d;font-size:12px;margin-top:20px">Sent from thefeelgoodcenter.in</p>
    </div>
  </div>`
}

/** Trims, caps length and strips control characters from a form value. */
export function clean(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value)
}
