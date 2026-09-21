/**
 * Razorpay Checkout, loaded on demand the same way the Cal.com embed is.
 *
 * Flow: POST /api/razorpay/order (server prices the session and creates the
 * order) → open Checkout → POST /api/razorpay/verify (server checks the
 * signature). Only a verified payment resolves `payForSession`.
 */
import type { SessionId } from '~~/shared/utils/sessionCatalogue'

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js'

type RazorpaySuccess = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

type RazorpayInstance = {
  open: () => void
  on: (event: 'payment.failed', cb: (resp: { error?: { description?: string } }) => void) => void
}

type RazorpayWindow = Window & {
  Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance
}

let pending: Promise<void> | null = null

export function loadRazorpay(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as RazorpayWindow).Razorpay) return Promise.resolve()
  if (pending) return pending

  pending = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = CHECKOUT_JS
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      pending = null
      reject(new Error('Razorpay checkout failed to load'))
    }
    document.head.appendChild(script)
  })

  return pending
}

export type PaymentCustomer = { name: string, email: string, phone: string, note?: string }

export type PaymentResult = { paymentId: string, orderId: string }

export class PaymentCancelled extends Error {
  constructor() { super('Payment cancelled') }
}

type OrderResponse = {
  orderId: string
  amount: number
  currency: string
  keyId: string
  session: { id: SessionId, title: string, amountInr: number }
}

/**
 * Takes the visitor through Checkout for one session and resolves only once
 * the server has verified the payment. Rejects with PaymentCancelled if they
 * close the window, or an Error with a readable message otherwise.
 */
export async function payForSession(sessionId: SessionId, customer: PaymentCustomer): Promise<PaymentResult> {
  const [order] = await Promise.all([
    $fetch<OrderResponse>('/api/razorpay/order', {
      method: 'POST',
      body: { sessionId, ...customer }
    }),
    loadRazorpay()
  ])

  const Razorpay = (window as RazorpayWindow).Razorpay
  if (!Razorpay) throw new Error('Razorpay checkout is unavailable right now.')

  return new Promise<PaymentResult>((resolve, reject) => {
    const rzp = new Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'The Feel Good Centre',
      description: order.session.title,
      image: '/images/apple-touch-icon-fgc.png',
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone
      },
      notes: { session_id: order.session.id },
      theme: { color: '#BC5237' },
      modal: {
        ondismiss: () => reject(new PaymentCancelled())
      },
      handler: async (response: RazorpaySuccess) => {
        try {
          const result = await $fetch<PaymentResult & { success: boolean }>('/api/razorpay/verify', {
            method: 'POST',
            body: response
          })
          resolve({ paymentId: result.paymentId, orderId: result.orderId })
        } catch {
          reject(new Error('We received your payment but could not verify it automatically. Please WhatsApp us with your payment ID and we will sort it out.'))
        }
      }
    })

    rzp.on('payment.failed', (resp) => {
      reject(new Error(resp?.error?.description || 'The payment did not go through. Nothing has been charged.'))
    })

    rzp.open()
  })
}
