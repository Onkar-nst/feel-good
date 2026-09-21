/**
 * Cal.com booking.
 *
 * The account is the client's own (cal.com/thefeelgoodcenter). Each session
 * has its own booking link; change them in one place here.
 *
 * Cal.com's embed script opens the calendar in an overlay and accepts
 * prefill through URL params (name, email, notes). If the script is blocked
 * we fall back to a normal tab so booking never dead-ends.
 */
export const CAL_USERNAME = 'thefeelgoodcenter'
export const CAL_URL = `https://cal.com/${CAL_USERNAME}`

export const EVENT_TYPES = {
  first30: `${CAL_URL}/first-conversation`,
  listening50: `${CAL_URL}/listening-session`,
  deep75: `${CAL_URL}/deep-session`
} as const

const EMBED_JS = 'https://app.cal.com/embed/embed.js'

type CalApi = ((...args: unknown[]) => void) & { loaded?: boolean, q?: unknown[], ns?: Record<string, unknown> }
type CalWindow = Window & { Cal?: CalApi }

let pending: Promise<void> | null = null

/**
 * Pulls in the Cal.com embed on demand rather than on every page load.
 * Safe to call repeatedly: the work happens once.
 *
 * This is Cal.com's official loader stub, written out longhand. embed.js
 * expects exactly this shape on window.Cal (a queue, `loaded`, and `ns`
 * for namespaces) and throws "Cal is not defined" otherwise.
 */
export function loadCal(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (pending) return pending

  pending = new Promise<void>((resolve, reject) => {
    const w = window as CalWindow
    const push = (api: CalApi, args: IArguments | unknown[]) => { (api.q = api.q || []).push(args) }

    if (!w.Cal) {
      const cal: CalApi = function (this: unknown) {
        const args = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          cal.loaded = true
          const script = document.createElement('script')
          script.src = EMBED_JS
          script.async = true
          script.onload = () => resolve()
          script.onerror = () => {
            pending = null
            reject(new Error('Cal.com embed failed to load'))
          }
          document.head.appendChild(script)
        }
        if (args[0] === 'init' && typeof args[1] === 'string') {
          const api: CalApi = function () { push(api, arguments) } as CalApi
          const namespace = args[1] as string
          api.q = api.q || []
          cal.ns![namespace] = cal.ns![namespace] || api
          push(cal.ns![namespace] as CalApi, args)
          push(cal, ['initNamespace', namespace])
          return
        }
        push(cal, args)
      } as CalApi
      w.Cal = cal
    } else {
      resolve()
    }

    w.Cal('init', { origin: 'https://cal.com' })
    w.Cal('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view' })
  })

  return pending
}

/**
 * Opens the Cal.com overlay for a booking URL. Falls back to a new tab if the
 * embed is unavailable (offline, tracker blockers, CSP).
 */
export async function openCal(url: string = CAL_URL): Promise<void> {
  try {
    await loadCal()
    const cal = (window as CalWindow).Cal
    if (!cal) throw new Error('embed unavailable')
    const { pathname, search } = new URL(url)
    cal('modal', { calLink: pathname.replace(/^\//, '') + search })
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

/**
 * Builds a booking URL with the visitor's details prefilled so nobody types
 * their name twice. `notes` lands in the booking's notes field, which is
 * where we put the session name and the Razorpay payment ID.
 */
export function withPrefill(url: string, prefill: { name?: string, email?: string, notes?: string }): string {
  const u = new URL(url)
  if (prefill.name) u.searchParams.set('name', prefill.name)
  if (prefill.email) u.searchParams.set('email', prefill.email)
  if (prefill.notes) u.searchParams.set('notes', prefill.notes)
  return u.toString()
}
