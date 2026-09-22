/**
 * The single source of truth for what can be paid for and what it costs.
 *
 * Lives in `shared/` so both the browser (to show the price) and the server
 * (to create the Razorpay order) read the same numbers. The server never
 * trusts an amount sent from the browser: it looks the session up here by id.
 *
 * Amounts are in rupees. Razorpay wants paise, and the order route does that
 * conversion in one place.
 */
export type SessionId =
  | 'first-conversation'
  | 'listening-50'
  | 'deep-75'
  | 'checkin-monthly'
  | 'gift-50'

export type CatalogueEntry = {
  id: SessionId
  title: string
  amountInr: number
  durationMinutes: number
}

export const SESSION_CATALOGUE: Record<SessionId, CatalogueEntry> = {
  'first-conversation': { id: 'first-conversation', title: 'First Feel-Good Conversation', amountInr: 799, durationMinutes: 30 },
  'listening-50': { id: 'listening-50', title: 'Feel-Good Listening Session', amountInr: 1799, durationMinutes: 50 },
  'deep-75': { id: 'deep-75', title: 'Deep Listening Session', amountInr: 2499, durationMinutes: 75 },
  'checkin-monthly': { id: 'checkin-monthly', title: 'Emotional Check-In Plans (monthly)', amountInr: 6500, durationMinutes: 50 },
  'gift-50': { id: 'gift-50', title: 'Gift a Session', amountInr: 1799, durationMinutes: 50 }
}

export function isSessionId(value: unknown): value is SessionId {
  return typeof value === 'string' && value in SESSION_CATALOGUE
}

export function formatInr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}
