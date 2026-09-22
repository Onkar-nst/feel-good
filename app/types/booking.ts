import type { SessionId } from '~~/shared/utils/sessionCatalogue'

export type SelectedSlot = {
  date: string       // "YYYY-MM-DD"
  time: string       // "14:00"
  label: string      // "2:00 PM"
  period: 'morning' | 'afternoon' | 'evening'
  startIso: string
  endIso: string
}

export type BookableService = {
  /** Key into the shared session catalogue; the server prices the order from it. */
  id: SessionId
  title: string
  duration?: string
  durationMinutes?: number
  price: string
  image?: string
}

export type BookingCustomer = {
  name: string
  email: string
  phone: string
  note?: string
  /** Gift a Session only: who actually attends. */
  recipientName?: string
  recipientEmail?: string
}

export type ConfirmedBookingResult = {
  paymentId: string
  orderId: string
  clash?: boolean
  meetingUrl?: string
  calendarEventUrl?: string | null
  slot?: {
    date: string
    time: string
  }
}
