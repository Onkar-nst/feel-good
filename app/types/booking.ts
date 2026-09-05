export type BookableService = {
  title: string
  duration?: string
  price: string
  image?: string
  /**
   * Calendly event type this session books onto. Falls back to the account
   * landing page (every event listed) when a session has no calendar of its own.
   */
  calendlyUrl?: string
}
