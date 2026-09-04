/**
 * Calendly booking.
 *
 * The account is the client's own, taken from the Calendly link on
 * thefeelgoodcenter.in/contact. Change it in one place here.
 *
 * If you later create per-session event types in Calendly (a 30 min, a 50 min,
 * a 75 min), add their slugs to EVENT_TYPES and pass the key to openCalendly()
 * so each service opens straight onto its own calendar.
 */
export const CALENDLY_URL = 'https://calendly.com/thefeelgoodcenter1007'

/**
 * The live event types on the account, read off the Calendly page itself.
 * Slugs are the client's own — including the "-clone" suffixes and the
 * "listenning" typo — so don't tidy them without renaming in Calendly first.
 *
 * Note there is no calendar yet for the 30-minute First Feel-Good
 * Conversation, the check-in plans, or Gift a Session, so those keep falling
 * back to CALENDLY_URL (the account page listing every option).
 */
export const EVENT_TYPES = {
  discovery15: `${CALENDLY_URL}/a-step-toward-lightness-15-min-discovery-call`,
  listening50: `${CALENDLY_URL}/50-minute-virtual-listening-session-clone`,
  deep75: `${CALENDLY_URL}/75-min-virtual-listenning-session-clone`
} as const

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void }
}

let pending: Promise<void> | null = null

/**
 * Pulls in Calendly's widget on demand rather than on every page load.
 * Safe to call repeatedly — the work happens once.
 */
export function loadCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as CalendlyWindow).Calendly) return Promise.resolve()
  if (pending) return pending

  pending = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = WIDGET_CSS
      link.dataset.calendly = 'true'
      document.head.appendChild(link)
    }

    const script = document.createElement('script')
    script.src = WIDGET_JS
    script.async = true
    script.dataset.calendly = 'true'
    script.onload = () => resolve()
    script.onerror = () => {
      pending = null
      reject(new Error('Calendly widget failed to load'))
    }
    document.head.appendChild(script)
  })

  return pending
}

/**
 * Opens the Calendly overlay. If the widget is blocked (offline, tracker
 * blockers, CSP) it falls back to a normal tab so booking never dead-ends.
 */
export async function openCalendly(url: string = CALENDLY_URL): Promise<void> {
  try {
    await loadCalendly()
    const calendly = (window as CalendlyWindow).Calendly
    if (!calendly?.initPopupWidget) throw new Error('widget unavailable')
    calendly.initPopupWidget({ url })
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
