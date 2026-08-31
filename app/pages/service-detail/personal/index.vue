<template>
    <Hero :offers="offerData" image="/images/service/2.jpg" />
    <Plans
        eyebrow="Personal Plans"
        title="Personal Wellbeing Services"
        :intro="introData"
        :plans="planData"
    />
    <CtaSection />
</template>

<script lang="ts" setup>
import Hero from '../components/Hero.vue';
import Plans, { type PlanType } from '../components/Plans.vue';
import CtaSection from '~/components/CtaSection.vue';

const offerData: string[] = [
  '1:1 Virtual Listening Sessions',
  'Monthly or Weekly Emotional Check In Plans',
  'Gift a Session',
  'Quick Catch Up Session'
]

const introData: string[] = [
  'At The Feel Good Center, we provide one to one listening sessions and emotional check ins designed to give you a safe, confidential space to simply be heard.',
  "Whether you're navigating stress, burnout, or just need someone to talk to, our personal services help you find clarity, lighten emotional load, and reconnect with yourself."
]

const planData: PlanType[] = [
  {
    number: '01.',
    title: '1:1 Virtual Listening Sessions',
    prices: ['Available in 50 minute or 75 minute sessions.', '₹1,799 (50 mins) | ₹2,499 (75 mins)'],
    description: "Sometimes, you just need to talk, without judgment, advice, or interruption. These private virtual sessions offer a safe, confidential space to speak freely, be heard, and feel lighter. Come as you are. We're here to listen.",
    actions: [
      { label: '50 Minute session', link: '/contact' },
      { label: '75 Minute session', link: '/contact' }
    ]
  },
  {
    number: '02.',
    title: 'Monthly or Weekly Emotional Check In Plans (50 mins)',
    prices: [
      'Weekly Plan: ₹6,500/month (4 sessions)',
      'Monthly Plan: ₹1,800/month (1 session)',
      'Bulk Package: 5 sessions at ₹8,500'
    ],
    description: 'Emotional wellness is ongoing. Our check in plans offer gentle, consistent support to help you reflect, reset, and stay grounded, no matter what life brings. Ideal for those seeking a little rhythm in their emotional care.',
    actions: [
      { label: 'Weekly Plan', link: '/contact' },
      { label: 'Monthly Plan', link: '/contact' },
      { label: 'Bulk package', link: '/contact' }
    ]
  },
  {
    number: '03.',
    title: 'Gift a Session',
    prices: ['₹1,799 (50 minute session)', 'Because everyone deserves to be heard.'],
    description: 'Support, wrapped in kindness. Give someone you care about the chance to be heard. Whether they\'re going through something or simply need a safe space to talk, this thoughtful gift says, "I see you. I\'m here."',
    actions: [
      { label: 'Buy now', link: '/contact' }
    ]
  },
  {
    number: '04.',
    title: 'Quick Catch Up Session (Returning Clients Only)',
    prices: ['₹1,000 (30 minutes)'],
    description: "This follow up session is designed for returning clients only. It's ideal for light emotional check ins, quick resets, or continued conversation. 30 minutes isn't enough for a first session, but it's perfect for staying connected.",
    actions: [
      { label: 'book your session', link: '/contact' }
    ]
  }
]

usePageTitle('Personal Listening Service')
</script>
