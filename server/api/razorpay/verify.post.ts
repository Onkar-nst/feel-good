import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import Razorpay from 'razorpay'
import { getMailer, rowsHtml, rowsText, wrapHtml } from '../../utils/mail'
import { createCalendarBooking } from '../../utils/googleCalendar'

/**
 * Confirms a payment really happened and books the slot on Google Calendar.
 *
 * Razorpay signs `order_id|payment_id` with the key secret.
 * Once verified in constant time, we:
 * 1. Create the Google Calendar event with a Google Meet video conference link.
 * 2. Send branded confirmation emails with meeting links to both client and Kinjal.
 * 3. Return the meeting link & confirmed details to the frontend.
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
    slotStartIso?: unknown
    slotEndIso?: unknown
    slotDate?: unknown
    slotLabel?: unknown
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

  // Fetch the order from Razorpay to read verified customer and slot details
  const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  const order = await razorpay.orders.fetch(orderId)
  const notes = (order.notes ?? {}) as Record<string, string>

  const customerName = notes.name || 'Friend'
  const customerEmail = notes.email || ''
  const customerPhone = notes.phone || ''
  const customerNote = notes.note || ''
  const sessionTitle = notes.session || 'Feel-Good Listening Session'
  const amountPaidInr = Number(order.amount) / 100

  const startIso = (typeof body?.slotStartIso === 'string' && body.slotStartIso) || notes.slot_start || ''
  const endIso = (typeof body?.slotEndIso === 'string' && body.slotEndIso) || notes.slot_end || ''
  const slotDate = (typeof body?.slotDate === 'string' && body.slotDate) || notes.slot_date || ''
  const slotLabel = (typeof body?.slotLabel === 'string' && body.slotLabel) || notes.slot_label || ''

  // 1. Create Google Calendar Event & Google Meet Link
  let calendarResult: { eventId: string, meetingUrl: string, calendarEventUrl: string | null } = {
    eventId: '',
    meetingUrl: '',
    calendarEventUrl: null
  }

  if (startIso && endIso) {
    try {
      calendarResult = await createCalendarBooking(event, {
        customerName,
        customerEmail,
        customerPhone,
        customerNote,
        sessionTitle,
        startIso,
        endIso,
        paymentId,
        amountInr: amountPaidInr
      })
    } catch (err) {
      console.error('[verify] Google Calendar creation failed:', err)
      calendarResult = {
        eventId: `fallback-${Date.now()}`,
        meetingUrl: '',
        calendarEventUrl: null
      }
    }
  }

  // 2. Format human-friendly Date & Time string
  const formattedDateTime = formatSlotDateTime(startIso, slotDate, slotLabel)

  // 3. Send email notifications to Kinjal and Client with Google Calendar & Google Meet links
  try {
    await notifyBooking({
      event,
      customerName,
      customerEmail,
      customerPhone,
      customerNote,
      sessionTitle,
      amount: `₹${amountPaidInr.toLocaleString('en-IN')}`,
      paymentId,
      orderId,
      startIso,
      endIso,
      formattedDateTime,
      meetingUrl: calendarResult.meetingUrl
    })
  } catch (err) {
    console.error('[verify] Booking email failed:', err)
  }

  return {
    success: true,
    paymentId,
    orderId,
    meetingUrl: calendarResult.meetingUrl,
    calendarEventUrl: calendarResult.calendarEventUrl,
    slot: {
      date: slotDate,
      time: slotLabel,
      formatted: formattedDateTime
    }
  }
})

function formatSlotDateTime(startIso?: string, slotDate?: string, slotLabel?: string): string {
  if (startIso) {
    try {
      const dt = new Date(startIso)
      if (!isNaN(dt.getTime())) {
        const datePart = dt.toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Asia/Kolkata'
        })
        const timePart = dt.toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata'
        })
        return `${datePart} at ${timePart} (IST)`
      }
    } catch {
      // ignore
    }
  }

  if (slotDate && slotLabel) {
    try {
      const [y, m, d] = slotDate.split('-').map(Number)
      if (y && m && d) {
        const dt = new Date(y, m - 1, d)
        const datePart = dt.toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        return `${datePart} at ${slotLabel} (IST)`
      }
    } catch {
      // ignore
    }
    return `${slotDate} at ${slotLabel} (IST)`
  }

  return 'Confirmed'
}

function createGoogleCalendarWebUrl(opts: {
  title: string
  details: string
  location: string
  startIso?: string
  endIso?: string
}): string {
  if (!opts.startIso || !opts.endIso) return ''
  try {
    const toGCalTime = (iso: string) => {
      const d = new Date(iso)
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    const dates = `${toGCalTime(opts.startIso)}/${toGCalTime(opts.endIso)}`
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: opts.title,
      dates,
      details: opts.details,
      location: opts.location
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  } catch {
    return ''
  }
}

async function notifyBooking(opts: {
  event: Parameters<typeof getMailer>[0]
  customerName: string
  customerEmail: string
  customerPhone: string
  customerNote: string
  sessionTitle: string
  amount: string
  paymentId: string
  orderId: string
  startIso: string
  endIso: string
  formattedDateTime: string
  meetingUrl: string
}) {
  const mailer = getMailer(opts.event)
  const config = useRuntimeConfig(opts.event)
  const gmailUser = config.gmailUser || 'thefeelgoodcentre.2026@gmail.com'

  const eventTitle = `Listening Session: ${opts.sessionTitle} with Kinjal Shah`
  const eventDesc = [
    `Confidential 1:1 Listening Session with Kinjal Shah (The Feel Good Centre).`,
    ``,
    `Client: ${opts.customerName}`,
    `Mobile: ${opts.customerPhone}`,
    `Session: ${opts.sessionTitle}`,
    `Payment Reference: ${opts.paymentId}`,
    opts.customerNote ? `Client Note: "${opts.customerNote}"` : '',
    opts.meetingUrl ? `Google Meet Link: ${opts.meetingUrl}` : ''
  ].filter(Boolean).join('\n')

  // 1-Click Google Calendar Web Link
  const gcalLink = createGoogleCalendarWebUrl({
    title: eventTitle,
    details: eventDesc,
    location: opts.meetingUrl || 'Google Meet (Virtual Video Call)',
    startIso: opts.startIso,
    endIso: opts.endIso
  })

  // 1. Send Luxury Notification to Kinjal
  const kinjalHtml = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><title>New Confirmed Booking</title></head>
  <body style="margin:0;padding:0;background-color:#FAF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1C1614;">
    <div style="max-width:600px;margin:24px auto;padding:0 16px;">
      <div style="background:#FFFFFF;border-radius:24px;border:1px solid #EFE8E1;padding:32px 28px;box-shadow:0 8px 30px rgba(28,22,20,0.04);">
        <div style="display:inline-block;background:#1E4635;color:#FFFFFF;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:16px;">
          &#10003; Paid Booking
        </div>
        <h2 style="margin:0 0 10px;font-family:Georgia,serif;font-size:22px;color:#1C1614;">
          New Booking: ${opts.sessionTitle}
        </h2>
        <p style="margin:0 0 20px;font-size:14px;color:#554B47;">
          <strong>${opts.customerName}</strong> has completed payment and confirmed their slot.
        </p>

        <div style="background:#FAF7F2;border:1px solid #ECE3DA;border-radius:18px;padding:20px;margin-bottom:20px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr>
              <td style="padding:6px 0;color:#7A6E68;width:120px;">Client:</td>
              <td style="padding:6px 0;font-weight:600;color:#1C1614;">${opts.customerName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Date &amp; Time:</td>
              <td style="padding:6px 0;font-weight:700;color:#BC5237;font-size:14px;">${opts.formattedDateTime}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Session:</td>
              <td style="padding:6px 0;font-weight:600;color:#1C1614;">${opts.sessionTitle}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Amount Paid:</td>
              <td style="padding:6px 0;font-weight:600;color:#1E4635;">${opts.amount}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Mobile:</td>
              <td style="padding:6px 0;"><a href="tel:${opts.customerPhone}" style="color:#1C1614;text-decoration:none;font-weight:600;">${opts.customerPhone}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Email:</td>
              <td style="padding:6px 0;"><a href="mailto:${opts.customerEmail}" style="color:#1C1614;text-decoration:none;font-weight:500;">${opts.customerEmail}</a></td>
            </tr>
            ${opts.customerNote ? `
            <tr>
              <td style="padding:6px 0;color:#7A6E68;vertical-align:top;">Client Note:</td>
              <td style="padding:6px 0;color:#1C1614;font-style:italic;">"${opts.customerNote}"</td>
            </tr>` : ''}
            ${opts.meetingUrl ? `
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Video Link:</td>
              <td style="padding:6px 0;font-weight:600;"><a href="${opts.meetingUrl}" target="_blank" style="color:#1E4635;text-decoration:underline;word-break:break-all;">${opts.meetingUrl}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding:6px 0;color:#7A6E68;">Payment ID:</td>
              <td style="padding:6px 0;font-family:monospace;color:#7A6E68;">${opts.paymentId}</td>
            </tr>
          </table>
        </div>

        <div style="text-align:center;padding-top:8px;">
          ${opts.meetingUrl ? `
          <a href="${opts.meetingUrl}" target="_blank" style="display:inline-block;background:#1E4635;color:#FFFFFF;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:13px;margin:4px 6px;">
            &#128249; Join Google Meet
          </a>` : ''}
          ${gcalLink ? `
          <a href="${gcalLink}" target="_blank" style="display:inline-block;background:#FAF7F2;border:1px solid #D9CFC7;color:#1E4635;padding:11px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:13px;margin:4px 6px;">
            &#128197; Add to Google Calendar
          </a>` : ''}
          <a href="https://wa.me/${opts.customerPhone.replace(/\D/g, '')}" target="_blank" style="display:inline-block;background:#25D366;color:#FFFFFF;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:13px;margin:4px 6px;">
            WhatsApp Client
          </a>
        </div>
      </div>
    </div>
  </body>
  </html>`

  await mailer.notify({
    subject: `Confirmed Booking: ${opts.sessionTitle} with ${opts.customerName}`,
    replyTo: opts.customerEmail || undefined,
    html: kinjalHtml,
    text: `New Confirmed Booking: ${opts.sessionTitle}\n\nClient: ${opts.customerName}\nDate & Time: ${opts.formattedDateTime}\nAmount: ${opts.amount}\nPhone: ${opts.customerPhone}\nEmail: ${opts.customerEmail}\nNote: ${opts.customerNote || 'None'}\nPayment ID: ${opts.paymentId}${opts.meetingUrl ? `\nGoogle Meet: ${opts.meetingUrl}` : ''}`
  })

  // 2. Send Luxury Confirmation Email to Client
  if (opts.customerEmail) {
    const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Session Confirmation - The Feel Good Centre</title>
    </head>
    <body style="margin:0;padding:0;background-color:#FAF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1C1614;">
      <div style="max-width:600px;margin:24px auto;padding:0 16px;">
        
        <!-- Header / Wordmark -->
        <div style="text-align:center;padding:24px 0 18px;">
          <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:600;letter-spacing:1px;color:#1C1614;">The Feel Good Centre</h1>
          <p style="margin:4px 0 0;font-size:11px;color:#857A75;letter-spacing:0.8px;text-transform:uppercase;">A Safe Space to Be Heard &middot; Mumbai</p>
        </div>

        <!-- Main Card -->
        <div style="background:#FFFFFF;border-radius:24px;border:1px solid #EFE8E1;box-shadow:0 8px 30px rgba(28,22,20,0.04);overflow:hidden;padding:32px 28px;">
          
          <!-- Status Badge -->
          <div style="display:inline-block;background:#EAF3ED;border:1px solid #C8E3D2;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;color:#1E4635;margin-bottom:18px;">
            &#10003; Session Confirmed
          </div>

          <!-- Greeting -->
          <h2 style="margin:0 0 10px;font-family:Georgia,serif;font-size:22px;color:#1C1614;line-height:1.3;">
            Thank you, ${opts.customerName}
          </h2>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#554B47;">
            Your listening session with Kinjal Shah has been reserved. We are holding this space for you. There is nothing you need to prepare&mdash;just bring yourself to a quiet, comfortable space.
          </p>

          <!-- Highlighted Session Card -->
          <div style="background:#FAF7F2;border:1px solid #ECE3DA;border-radius:18px;padding:22px;margin-bottom:24px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#BC5237;margin-bottom:8px;">
              Session Details
            </div>
            <div style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#1C1614;margin-bottom:12px;">
              ${opts.sessionTitle}
            </div>

            <div style="border-top:1px solid #E5DAD0;padding-top:14px;margin-top:8px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#7A6E68;width:110px;vertical-align:top;">Date &amp; Time:</td>
                  <td style="padding:6px 0;font-size:15px;font-weight:700;color:#1C1614;line-height:1.4;">
                    ${opts.formattedDateTime}
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#7A6E68;">Mode:</td>
                  <td style="padding:6px 0;font-size:13px;font-weight:500;color:#1E4635;">1:1 Virtual Video Call</td>
                </tr>
                ${opts.meetingUrl ? `
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#7A6E68;">Video Link:</td>
                  <td style="padding:6px 0;font-size:13px;font-weight:600;">
                    <a href="${opts.meetingUrl}" target="_blank" style="color:#1E4635;text-decoration:underline;word-break:break-all;">
                      ${opts.meetingUrl}
                    </a>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#7A6E68;">Guide:</td>
                  <td style="padding:6px 0;font-size:13px;font-weight:500;color:#1C1614;">Kinjal Shah</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Video Call & Google Calendar Section -->
          <div style="text-align:center;margin-bottom:28px;padding:6px 0;">
            ${opts.meetingUrl ? `
            <div style="margin-bottom:12px;">
              <a href="${opts.meetingUrl}" target="_blank" style="display:inline-block;background:#1E4635;color:#FFFFFF;padding:13px 26px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;box-shadow:0 4px 12px rgba(30,70,53,0.15);">
                &#128249; Join Google Meet Room &rarr;
              </a>
            </div>` : ''}
            ${gcalLink ? `
            <div>
              <a href="${gcalLink}" target="_blank" style="display:inline-block;background:#FAF7F2;border:1px solid #D9CFC7;color:#1E4635;padding:11px 22px;border-radius:12px;text-decoration:none;font-weight:600;font-size:13px;">
                &#128197; Add to Google Calendar &rarr;
              </a>
            </div>` : ''}
          </div>

          <!-- Video Call Note -->
          <div style="background:#EEF5F1;border:1px solid #D4E7DC;border-radius:16px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#1E4635;">
              &#128276; How will I join the session?
            </p>
            <p style="margin:0;font-size:13px;line-height:1.5;color:#2D5A46;">
              ${opts.meetingUrl ? `Your secure Google Meet video link is ready above and also saved in your Google Calendar event.` : `Your session will take place via Google Meet.`} Kinjal will also confirm with you on WhatsApp (${opts.customerPhone || 'your mobile number'}) prior to your session so you can join easily with one tap.
            </p>
          </div>

          <!-- Receipt Breakdown -->
          <div style="border-top:1px solid #EFE8E1;padding-top:20px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#857A75;margin-bottom:12px;">
              Booking Summary
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr>
                <td style="padding:6px 0;color:#7A6E68;">Amount Paid:</td>
                <td style="padding:6px 0;text-align:right;font-weight:700;color:#1C1614;">${opts.amount}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#7A6E68;">Payment Reference:</td>
                <td style="padding:6px 0;text-align:right;font-family:monospace;color:#554B47;">${opts.paymentId}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#7A6E68;">Client:</td>
                <td style="padding:6px 0;text-align:right;color:#1C1614;">${opts.customerName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#7A6E68;">Email:</td>
                <td style="padding:6px 0;text-align:right;color:#1C1614;">${opts.customerEmail}</td>
              </tr>
            </table>
          </div>

        </div>

        <!-- Footer -->
        <div style="text-align:center;padding:24px 16px;color:#857A75;font-size:12px;line-height:1.6;">
          <p style="margin:0 0 8px;">
            Need to reschedule or have a question? Reply directly to this email or message Kinjal on
            <a href="https://wa.me/919004989199" style="color:#BC5237;font-weight:600;text-decoration:none;">WhatsApp (+91 90049 89199)</a>.
          </p>
          <p style="margin:0;color:#A99F9A;font-size:11px;">
            100% Confidential &middot; Safe Space &middot; &copy; The Feel Good Centre Mumbai
          </p>
        </div>

      </div>
    </body>
    </html>`

    await mailer.send({
      to: opts.customerEmail,
      subject: `Your session is confirmed: ${opts.sessionTitle} - The Feel Good Centre`,
      html: clientHtml,
      text: `Thank you, ${opts.customerName}!\n\nYour session is confirmed for ${opts.formattedDateTime}.\n\nSession: ${opts.sessionTitle}\nAmount Paid: ${opts.amount}\nPayment ID: ${opts.paymentId}${opts.meetingUrl ? `\nGoogle Meet Link: ${opts.meetingUrl}` : ''}\n\nNeed to reschedule? Message us on WhatsApp (+91 90049 89199).`
    })
  }
}
