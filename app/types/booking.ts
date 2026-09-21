import type { SessionId } from '~~/shared/utils/sessionCatalogue'

export type BookableService = {
  /** Key into the shared session catalogue; the server prices the order from it. */
  id: SessionId
  title: string
  duration?: string
  price: string
  image?: string
  /**
   * Cal.com booking link this session books onto. Falls back to the account
   * page (every session listed) when one is not given.
   */
  bookingUrl?: string
}
