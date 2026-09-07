import { CALENDLY_URL, EVENT_TYPES } from '~/utils/calendly'
import type { BookableService } from '~/types/booking'

export type ServiceType = BookableService & {
  description: string
  imageAlt?: string
  link: string
  priceLabel?: string
  badge?: string
  /** Straight to this session's calendar where one exists, else the account page. */
  calendlyUrl: string
}

/** The bookable sessions, shown on the home page and on every service page. */
export const serviceData: ServiceType[] = [
  {
    title: 'First Feel-Good Conversation',
    calendlyUrl: CALENDLY_URL,
    duration: '30 min',
    price: '₹799',
    badge: 'Start here',
    image: '/images/service/session-first.jpg',
    imageAlt: 'A woman waving hello at the start of a video call',
    description: "A gentle first step. See how it feels to be listened to, with nothing expected of you after.",
    link: '/service-detail/personal'
  },
  {
    title: 'Feel-Good Listening Session',
    calendlyUrl: EVENT_TYPES.listening50,
    duration: '50 min',
    price: '₹1,799',
    badge: 'Most booked',
    image: '/images/service/session-core.jpg',
    imageAlt: 'A woman talking openly from her sofa during a call',
    description: "Our core session. Room to say the whole thing, not just the headline.",
    link: '/service-detail/personal'
  },
  {
    title: 'Deep Listening Session',
    calendlyUrl: EVENT_TYPES.deep75,
    duration: '75 min',
    price: '₹2,499',
    image: '/images/service/session-deep.jpg',
    imageAlt: 'A woman sitting quietly with her laptop, unhurried',
    description: 'For the heavier things that take a while to reach. No clock watching, no rushing.',
    link: '/service-detail/personal'
  },
  {
    title: 'Emotional Check-In Plans',
    calendlyUrl: CALENDLY_URL,
    duration: '4 sessions / month',
    price: '₹6,500',
    priceLabel: '/ month',
    image: '/images/service/session-checkin.jpg',
    imageAlt: 'A woman laughing over a warm drink during a check in',
    description: 'Weekly or monthly. Not just support, but consistent care from someone who remembers.',
    link: '/service-detail/personal'
  },
  {
    title: 'Gift a Session',
    calendlyUrl: CALENDLY_URL,
    duration: '50 min',
    price: '₹1,799',
    image: '/images/service/session-gift.jpg',
    imageAlt: 'A woman smiling warmly into the camera',
    description: 'Because everyone deserves to be heard. Give someone an hour that is entirely theirs.',
    link: '/service-detail/personal'
  }
]
