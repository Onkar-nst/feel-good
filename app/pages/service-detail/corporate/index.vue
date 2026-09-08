<template>
    <Hero :offers="offerData" image="/images/service/3.jpg" />
    <Plans
        eyebrow="Corporate Plans"
        title="Corporate Wellbeing Services"
        :intro="introData"
        :plans="planData"
    />
    <HowItWorks />
    <CtaSection />
</template>

<script lang="ts" setup>
import Hero from '../components/Hero.vue';
import Plans, { type PlanType } from '../components/Plans.vue';
import HowItWorks from '../components/HowItWorks.vue';
import CtaSection from '~/components/CtaSection.vue';

const offerData: string[] = [
  'Starter Plan',
  'Core Plan',
  'Extended Support Plan',
  'Quarterly Insights',
  'Group Workshops & Mental Wellbeing Talks'
]

const introData: string[] = [
  'Support your team with meaningful emotional care.',
  "At The Feel Good Centre, we offer confidential, one to one emotional listening sessions for companies that want to support their employees' mental wellness, without the formality of therapy or coaching.",
  "In today's high pressure work environment, your people need a safe, human space to pause, express, and feel heard. When employees feel emotionally supported, they're more focused, collaborative, and resilient at work."
]

const planData: PlanType[] = [
  {
    number: '01.',
    title: 'Starter Plan (Up to 10 employees)',
    featuresTitle: 'Includes:',
    features: [
      '10 x 50 min 1:1 sessions (one per employee)',
      'Optional intro session: "Why Feeling Heard Matters at Work"'
    ],
    actions: [{ label: 'Click Here', link: '/contact' }]
  },
  {
    number: '02.',
    title: 'Core Plan (Up to 25 employees)',
    featuresTitle: 'Includes:',
    features: [
      '25 x 50 min 1:1 sessions (one per employee)',
      '1 x monthly group emotional wellness check in',
      'Anonymous feedback insights',
      'Priority scheduling'
    ],
    actions: [{ label: 'Click Here', link: '/contact' }]
  },
  {
    number: '03.',
    title: 'Extended Support Plan (Up to 50 employees)',
    featuresTitle: 'Includes:',
    features: [
      '50 x 50 min 1:1 sessions (one per employee)',
      '2 x monthly group workshops',
      'Priority scheduling',
      'Quarterly usage & trend reports (anonymous)'
    ],
    actions: [{ label: 'Click Here', link: '/contact' }]
  },
  {
    number: '04.',
    title: 'Quarterly Insights (Anonymous)',
    description: 'To help you understand what your team needs',
    actions: [{ label: 'Click Here', link: '/contact' }]
  },
  {
    number: '05.',
    title: 'Group Workshops & Mental Wellbeing Talks',
    description: "Release What's Heavy, Safely and Freely.",
    actions: [{ label: 'Click Here', link: '/contact' }]
  }
]

usePageTitle('Corporate Services')
</script>
