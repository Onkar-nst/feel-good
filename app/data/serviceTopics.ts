/**
 * Content model behind the per problem landing pages (CLIENT-NOTES section 5).
 *
 * One dynamic route renders every entry, so the design signed off on the
 * "Feeling Overwhelmed" page stays identical across all nine topics and only
 * the copy, imagery and search intent change. The slugs match the Services
 * dropdown in the topbar and the footer column, so adding a topic here is the
 * only change a new landing page needs.
 */

export type ServiceTopic = {
  slug: string
  /** Short label used for the page <title> and breadcrumbs. */
  navTitle: string
  hero: {
    eyebrow: string
    /** The H1. Kept close to the phrase people actually search for. */
    heading: string
    intro: string
    /** Second paragraph: the ask, in one sentence. */
    invitation: string
    image: string
    imageAlt: string
  }
  /** Pre-filled WhatsApp message for the secondary hero CTA. */
  whatsappText: string
  recognition: {
    eyebrow: string
    heading: string
    intro: string
    signs: { icon: string, text: string }[]
  }
  quote: {
    text: string
    author: string
    avatar: string
  }
  faqs: { q: string, a: string }[]
  metaDescription: string
}

/* Shared across every topic: the offer itself does not change with the reason
   someone books, so these live once rather than nine times. */
export const IS_LIST: string[] = [
  'Undivided attention on a private video call, for as long as your session runs.',
  'A space to think out loud without being interrupted.',
  'Complete confidentiality. Nothing recorded, nothing shared.',
  'Somewhere to start, with no commitment to continue.'
]

export const IS_NOT_LIST: string[] = [
  'Therapy, counselling or a clinical diagnosis.',
  'Coaching, or a plan you have to follow afterwards.',
  'Advice you did not ask for.',
  'Emergency or crisis care.'
]

export const STEPS = [
  { title: 'Choose what you need', body: 'Pick the kind of support that fits, whether it is a one off conversation or something ongoing.' },
  { title: 'Book your slot', body: 'Open the calendar, pick a time that suits you, and it is confirmed straight away.' },
  { title: 'We meet and you talk', body: 'A video call on Zoom or Google Meet. Say as much or as little as you want to.' },
  { title: 'You leave lighter', body: 'Most people finish the call with a clearer head and the weight sitting a little easier.' }
]

/* The two questions asked on every topic, appended after the topic specific
   ones so each page opens on something particular to why that person came. */
const COMMON_FAQS = [
  {
    q: 'Is this confidential?',
    a: 'Completely. Nothing you share leaves the session. Nothing is recorded, nothing is written down, and nothing is repeated to anyone.'
  },
  {
    q: 'What does it cost?',
    a: 'You can start with a ₹799 session of 30 minutes, which is the easiest way to try this out and see how it feels. If you would like more room to talk, a full 50 minute session is ₹1,799. Weekly and monthly plans bring the cost per session down further.'
  }
]

const topics: ServiceTopic[] = [
  {
    slug: 'feeling-overwhelmed',
    navTitle: 'Feeling Overwhelmed',
    hero: {
      eyebrow: 'If you are carrying too much',
      heading: 'Feeling overwhelmed and need someone to talk to?',
      intro: 'Everything at once, and no room to put any of it down. You are not being dramatic, and you do not need a reason big enough to justify it.',
      invitation: 'Book a private listening session and say it out loud to someone whose only job is to hear you.',
      image: '/images/service-detail/feeling-overwhelmed.jpg',
      imageAlt: 'A woman sunk back into her sofa by the window, eyes closed'
    },
    whatsappText: "Hi! I've been feeling overwhelmed and would like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Overwhelmed rarely looks like falling apart',
      intro: 'Most people who book a session are functioning perfectly well on the outside. That is exactly the problem.',
      signs: [
        { icon: 'tabler:list-check', text: "My list grows faster than I can clear it." },
        { icon: 'tabler:zzz', text: "I am tired in a way that sleeping does not fix." },
        { icon: 'tabler:mood-sad', text: "Small things set me off more than they used to." },
        { icon: 'tabler:message-2', text: "I keep saying I am fine because it is quicker." },
        { icon: 'tabler:moon-stars', text: "My mind is loudest at night, when nobody is awake." },
        { icon: 'tabler:calendar-repeat', text: "I have been meaning to deal with this for months." }
      ]
    },
    quote: {
      text: 'Whenever I am stressed or anxious, a single conversation with Kinjal works like magic. She has this natural ability to calm someone down, clear their head, and make everything feel lighter.',
      author: 'Jash Shah',
      avatar: '/images/reviews/jash-shah.jpg'
    },
    faqs: [
      {
        q: 'I am not in crisis. Is it still alright to book?',
        a: 'Yes, and most people who book are not. You do not have to be in crisis to deserve to be heard. Everyday weight counts.'
      },
      {
        q: 'What if I cannot explain what is wrong?',
        a: 'That is a completely normal place to start. Plenty of people begin by saying they do not know where to begin.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Feeling overwhelmed and need someone to talk to? Book a private, confidential listening session with The Feel Good Centre. No therapy, no advice, just the space to be properly heard.'
  },

  {
    slug: 'work-stress-burnout',
    navTitle: 'Work Stress & Burnout',
    hero: {
      eyebrow: 'If work has taken over',
      heading: 'Need someone to talk to about work stress?',
      intro: 'The job is fine on paper, and you are still running on empty. Nobody at work is the right person to say that to, and saying it at home only worries people.',
      invitation: 'Book a private listening session and talk about work without it getting back to anyone.',
      image: '/images/service-detail/work-stress-burnout.jpg',
      imageAlt: 'A woman stepping away from work with a drink in a sunlit kitchen'
    },
    whatsappText: "Hi! Work has been a lot lately and I'd like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Burnout does not always look like quitting',
      intro: 'Most people who book are still showing up, still delivering, and quietly running out of road.',
      signs: [
        { icon: 'tabler:battery-1', text: "I am exhausted before the day has even started." },
        { icon: 'tabler:device-laptop', text: "I check my messages the moment I wake up." },
        { icon: 'tabler:clock-hour-9', text: "Sunday evening already feels heavy by the afternoon." },
        { icon: 'tabler:mood-neutral', text: "Work I used to enjoy is now something to get through." },
        { icon: 'tabler:users', text: "There is nobody at work I can safely say this to." },
        { icon: 'tabler:home', text: "By the time I get home there is nothing left of me." }
      ]
    },
    quote: {
      text: 'Whenever I am stressed or anxious, a single conversation with Kinjal works like magic. She has this natural ability to calm someone down, clear their head, and make everything feel lighter.',
      author: 'Jash Shah',
      avatar: '/images/reviews/jash-shah.jpg'
    },
    faqs: [
      {
        q: 'Will any of this get back to my employer?',
        a: 'Never. This is a private session you book yourself. There is no report, no record and no connection to your workplace of any kind.'
      },
      {
        q: 'I do not want career advice. Is that alright?',
        a: 'That is exactly the point. This is not coaching. Nobody will tell you to quit, negotiate or make a plan unless you ask for that conversation yourself.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Need someone to talk to about work stress or burnout? Book a private, confidential listening session with The Feel Good Centre. No advice, no reporting, just the space to be heard.'
  },

  {
    slug: 'breakup-relationship-support',
    navTitle: 'Breakup & Relationship Support',
    hero: {
      eyebrow: 'If something has ended, or is ending',
      heading: 'Going through a breakup and do not want advice?',
      intro: 'Everyone has an opinion about what you should do next. Sometimes you just need to say how it actually feels, without anyone taking sides.',
      invitation: 'Book a private listening session and talk it through with someone who will not tell you what to do.',
      image: '/images/service-detail/breakup-relationship-support.jpg',
      imageAlt: 'A woman sitting on the floor against her sofa, arms folded in'
    },
    whatsappText: "Hi! I'm going through a breakup and would like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'You are allowed to still be sad about it',
      intro: 'There is no timeline for this, and no version of it you are supposed to be over by now.',
      signs: [
        { icon: 'tabler:message-circle', text: "My friends have heard this story too many times already." },
        { icon: 'tabler:phone', text: "I still reach for my phone before I remember." },
        { icon: 'tabler:refresh', text: "I keep replaying the last conversation at night." },
        { icon: 'tabler:users', text: "Everyone keeps telling me what I should do next." },
        { icon: 'tabler:mood-neutral', text: "I say I am fine because explaining takes too long." },
        { icon: 'tabler:heart-broken', text: "People think I should be over this by now." }
      ]
    },
    quote: {
      text: 'At times you just want someone to listen to you and not fix any problems. Kinjal exactly does that. Overall a great experience.',
      author: 'Jinal',
      avatar: '/images/reviews/jinal.jpg'
    },
    faqs: [
      {
        q: 'Will you tell me whether to get back together?',
        a: 'No. That decision is yours, and it is not one anyone can make for you in a single conversation. What you get here is room to hear yourself think about it.'
      },
      {
        q: 'It has been months. Is it too late to book?',
        a: 'Not at all. Plenty of people come long after everyone else has assumed they moved on. There is no expiry date on needing to talk about it.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Going through a breakup and need someone to talk to? Book a private, confidential listening session with The Feel Good Centre. No advice, no taking sides, just space to say how it really feels.'
  },

  {
    slug: 'feeling-lonely',
    navTitle: 'Feeling Lonely',
    hero: {
      eyebrow: 'If there is nobody to call',
      heading: 'Feeling lonely even when you are surrounded by people?',
      intro: 'You can have a full contact list and still have nobody to say the real thing to. Loneliness is not always about being alone.',
      invitation: 'Book a private listening session and have one conversation that is entirely about you.',
      image: '/images/service-detail/feeling-lonely.jpg',
      imageAlt: 'A woman alone on a sofa in a large, light-filled room'
    },
    whatsappText: "Hi! I've been feeling lonely lately and would like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Being surrounded is not the same as being known',
      intro: 'Most people who book have plenty of people around them. That is what makes it hard to explain.',
      signs: [
        { icon: 'tabler:message-2', text: "I have not had a real conversation in weeks." },
        { icon: 'tabler:phone', text: "I scroll through my contacts and put the phone down again." },
        { icon: 'tabler:users', text: "I am always the one who reaches out first." },
        { icon: 'tabler:mood-neutral', text: "I feel most alone in a room full of people." },
        { icon: 'tabler:clock-hour-9', text: "Weekends are the hardest part of the week." },
        { icon: 'tabler:heart', text: "I want someone to ask how I am and actually mean it." }
      ]
    },
    quote: {
      text: 'Kinjal feels like home. Familiar, safe and understanding. Her energy is so grounding that simply by talking to her, I start looking at things with a fresh perspective.',
      author: 'Manvi Gupta',
      avatar: '/images/reviews/manvi-gupta.jpg'
    },
    faqs: [
      {
        q: 'Is it strange to book a session just to talk to someone?',
        a: 'Not at all. That is precisely what this is for. Wanting to be heard is a good enough reason on its own.'
      },
      {
        q: 'Can I book the same listener again?',
        a: 'Yes. Many people come back to Kinjal regularly, and there are weekly and monthly plans for exactly that reason.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Feeling lonely and have no one to talk to? Book a private, confidential listening session with The Feel Good Centre. Real attention, with no judgment.'
  },

  {
    slug: 'family-pressure',
    navTitle: 'Family Pressure & Expectations',
    hero: {
      eyebrow: 'If home comes with conditions',
      heading: 'Cannot tell your family what you are really feeling?',
      intro: 'You love them, and you still cannot say this to them. Keeping the peace at home often means carrying it somewhere else.',
      invitation: 'Book a private listening session and say the part you never get to say at home.',
      image: '/images/service-detail/family-pressure.jpg',
      imageAlt: 'A woman moving quietly through a warm family home'
    },
    whatsappText: "Hi! I'd like to know more about a listening session. Things at home have been a lot.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Keeping the peace has a cost',
      intro: 'You can be close to your family and still have nowhere in the house to be honest.',
      signs: [
        { icon: 'tabler:masks-theater', text: "I edit myself before I speak at home." },
        { icon: 'tabler:message-2', text: "Every honest conversation turns into an argument." },
        { icon: 'tabler:scale', text: "They want one life for me and I want another." },
        { icon: 'tabler:mood-neutral', text: "I agree to things just to end the discussion." },
        { icon: 'tabler:heart', text: "I feel guilty for wanting something different." },
        { icon: 'tabler:door', text: "There is nowhere in this house to be honest." }
      ]
    },
    quote: {
      text: 'She creates this calm, judgment free space where we naturally open up about things we have been carrying alone. If you are looking for someone who will truly listen at your pace, she is the real deal.',
      author: 'Jyot Agnani',
      avatar: '/images/reviews/jyot-agnani.jpg'
    },
    faqs: [
      {
        q: 'Will you tell me to confront my family?',
        a: 'No. Nobody here will hand you an ultimatum or a script. You decide what, if anything, changes at home.'
      },
      {
        q: 'Does anyone need to know I booked this?',
        a: 'No. The session is entirely private, and a first name is all we need from you.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Struggling with family pressure and expectations? Book a private, confidential listening session with The Feel Good Centre. Somewhere to be honest, with no judgment and no advice.'
  },

  {
    slug: 'career-life-confusion',
    navTitle: 'Career & Life Confusion',
    hero: {
      eyebrow: 'If you are not sure what comes next',
      heading: 'Confused about your career or your life right now?',
      intro: 'Not unhappy exactly, and not sure this is it either. The question is hard to ask out loud when everyone expects you to have an answer.',
      invitation: 'Book a private listening session and think it through out loud, without being rushed to a decision.',
      image: '/images/service-detail/career-life-confusion.jpg',
      imageAlt: 'A woman at a table by a window, looking out at the evening light'
    },
    whatsappText: "Hi! I've been feeling unsure about my career and life direction. I'd like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'You do not need a plan to be allowed to talk about it',
      intro: 'Most people who book are not stuck in a crisis. They are stuck in a question nobody around them takes seriously.',
      signs: [
        { icon: 'tabler:compass', text: "Everyone else seems to have it figured out." },
        { icon: 'tabler:mood-neutral', text: "On paper it is all fine. It still does not fit." },
        { icon: 'tabler:arrows-shuffle', text: "I keep changing my mind and getting nowhere." },
        { icon: 'tabler:clock-hour-9', text: "I am waiting to feel sure, and it never comes." },
        { icon: 'tabler:users', text: "Everyone I ask gives me their answer, not mine." },
        { icon: 'tabler:message-2', text: "I have not said any of this out loud to anyone." }
      ]
    },
    quote: {
      text: 'In today\'s chaotic and busy times, Kinjal is someone who can calm you down in a few minutes. With her by my side I have learnt how to become patient in my most difficult times. She has helped me keep my hopes alive in the most positive manner.',
      author: 'Kinnari Kamdar',
      avatar: '/images/reviews/kinnari-kamdar.jpg'
    },
    faqs: [
      {
        q: 'Is this career coaching?',
        a: 'No. There is no plan, no framework and no homework. It is a conversation where you get to hear your own thinking without interruption.'
      },
      {
        q: 'What if I have nothing concrete to discuss?',
        a: 'That is a fine place to start. Plenty of sessions begin with someone saying they do not know where to begin.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Confused about your career or life direction? Book a private, confidential listening session with The Feel Good Centre. Space to think out loud, without advice or pressure.'
  },

  {
    slug: 'living-away-from-home',
    navTitle: 'Living Away from Home',
    hero: {
      eyebrow: 'If home is a long way away',
      heading: 'Moved away from home and feeling alone?',
      intro: 'New city, new time zone, and nobody who knew you before. You do not want to worry the people back home, so you tell them it is going well.',
      invitation: 'Book a private listening session and talk to someone who has time for the whole story.',
      image: '/images/service-detail/living-away-from-home.jpg',
      imageAlt: 'A woman on a video call to people back home from a bright, unfamiliar flat'
    },
    whatsappText: "Hi! I'm living away from home and would like to know more about a listening session.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Homesick is not the same as regretting it',
      intro: 'You can be glad you moved and still find it lonelier than you expected.',
      signs: [
        { icon: 'tabler:phone', text: "I tell them it is going great." },
        { icon: 'tabler:world', text: "The time difference eats every real conversation." },
        { icon: 'tabler:users', text: "I know people here, but nobody really knows me." },
        { icon: 'tabler:mood-neutral', text: "I thought I would feel settled by now." },
        { icon: 'tabler:home', text: "Small everyday things suddenly remind me of home." },
        { icon: 'tabler:message-2', text: "I do not want to worry anyone back home." }
      ]
    },
    quote: {
      text: 'Kinjal feels like home. Familiar, safe and understanding. Her energy is so grounding that simply by talking to her, that feeling of being stuck vanishes away.',
      author: 'Manvi Gupta',
      avatar: '/images/reviews/manvi-gupta.jpg'
    },
    faqs: [
      {
        q: 'I am in a different time zone. Can we still meet?',
        a: 'Yes. Sessions happen online, and the calendar shows real availability in your own time zone when you book.'
      },
      {
        q: 'Can we talk in Hindi or Gujarati?',
        a: 'Yes. Say so when you book and the session will be held in whichever language you are most comfortable in.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Living away from home and missing it? Book a private, confidential online listening session with The Feel Good Centre. Someone with time for the whole story, in your own time zone.'
  },

  {
    slug: 'someone-to-talk-to',
    navTitle: 'Someone to Talk To',
    hero: {
      eyebrow: 'If today has just been one of those days',
      heading: 'Having one of those days where you just need someone?',
      intro: 'Nothing dramatic has happened. You would simply like to talk to someone who is not busy, not distracted, and not waiting for their turn.',
      invitation: 'Book a private listening session and take some time that belongs entirely to you.',
      image: '/images/service-detail/someone-to-talk-to.jpg',
      imageAlt: 'A woman sitting cross-legged on her bed, mid conversation'
    },
    whatsappText: "Hi! I just need someone to talk to. Could you tell me more about a listening session?",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'You do not need a reason big enough to justify it',
      intro: 'Most people who book are not in crisis. They are simply carrying an ordinary week and would like to set it down.',
      signs: [
        { icon: 'tabler:message-2', text: "I start typing a message to a friend, then delete it." },
        { icon: 'tabler:clock-hour-9', text: "Everyone is busy and it never seems like the moment." },
        { icon: 'tabler:mood-neutral', text: "Nothing is wrong exactly, and something is still off." },
        { icon: 'tabler:ear', text: "I want to be listened to, not fixed." },
        { icon: 'tabler:moon-stars', text: "It all gets louder once the day goes quiet." },
        { icon: 'tabler:heart', text: "I would like one conversation that is about me." }
      ]
    },
    quote: {
      text: 'At times you just want someone to listen to you and not fix any problems. Kinjal exactly does that. Overall a great experience.',
      author: 'Jinal',
      avatar: '/images/reviews/jinal.jpg'
    },
    faqs: [
      {
        q: 'My problem feels too small for this.',
        a: 'It is not. There is no minimum. If it is on your mind often enough to have read this far, it is worth talking about.'
      },
      {
        q: 'What if I go quiet, or do not know what to say?',
        a: 'That is completely fine. Silence is allowed, and there is no pressure to fill it. The time is yours to use however you need.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Just need someone to talk to? Book a private, confidential listening session with The Feel Good Centre. Undivided attention, with no judgment and no advice.'
  },

  {
    slug: 'the-strong-one',
    navTitle: 'The Strong One',
    hero: {
      eyebrow: 'If you are the one everyone leans on',
      heading: 'Always the strong one, with nowhere to put it down?',
      intro: 'You are the person everyone calls. Being reliable becomes its own kind of quiet, because nobody thinks to ask how you are doing.',
      invitation: 'Book a private listening session and be the one who gets listened to for once.',
      image: '/images/service-detail/the-strong-one.jpg',
      imageAlt: 'A woman leaning back into the sunlight, letting her shoulders drop'
    },
    whatsappText: "Hi! I'm usually the one others lean on, and I'd like to know more about a listening session for myself.",
    recognition: {
      eyebrow: 'Does this sound familiar',
      heading: 'Being dependable is not the same as being fine',
      intro: 'The people who hold everything together are usually the last ones anyone checks on.',
      signs: [
        { icon: 'tabler:phone', text: "I am the first person everyone calls when something goes wrong." },
        { icon: 'tabler:mood-neutral', text: "Nobody asks how I am, because they assume I am fine." },
        { icon: 'tabler:shield', text: "I play down my own week so it does not add to anyone's load." },
        { icon: 'tabler:message-2', text: "Saying I am struggling feels like letting people down." },
        { icon: 'tabler:battery-1', text: "I give advice all day and have nowhere to take my own." },
        { icon: 'tabler:heart', text: "Just once, I would like to be on the other side of it." }
      ]
    },
    quote: {
      text: 'Kinjal is very sweet, genuine and most importantly she is there to listen. No judgements, no unnecessary advices. Her calmness helped me stay calm and it is indeed feel good center.',
      author: 'Harshit Shah',
      avatar: '/images/reviews/harshit-shah.jpg'
    },
    faqs: [
      {
        q: 'I usually give the advice. Will this feel odd?',
        a: 'Often it does for the first few minutes, and then it does not. You are not being assessed. You are simply being listened to.'
      },
      {
        q: 'Do I have to keep coming back?',
        a: 'No. One session is a complete thing on its own. Plans exist for people who want the regularity, not as an expectation.'
      },
      ...COMMON_FAQS
    ],
    metaDescription: 'Always the strong one with nowhere to put it down? Book a private, confidential listening session with The Feel Good Centre. A conversation where you are the one being heard.'
  }
]

export const serviceTopics = topics

export const findTopic = (slug: string) => topics.find(topic => topic.slug === slug)
