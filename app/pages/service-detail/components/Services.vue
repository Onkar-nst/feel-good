<template>
     <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container">
            <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-10">Our plans</h2>

            <div class="grid lg:grid-cols-2 gap-7.5">
                <!-- Plan Loop -->
                <div v-for="(plan, idx) in planData" :key="idx" class="border border-default-200 rounded-xl lg:p-10 p-6 flex flex-col gap-7.5">
                    <div class="text-sm text-default-500">{{ plan.eyebrow }}</div>

                    <div>
                        <h3 class="h-display text-2xl mb-4">{{ plan.title }}</h3>
                        <p>{{ plan.description }}</p>
                    </div>

                    <div class="mt-auto">
                        <NuxtLink :to="plan.link" class="group py-3.5 px-8 inline-flex items-center justify-center gap-5 rounded-lg bg-primary text-primary-ink font-medium transition-all">
                            <span class="relative block overflow-hidden">
                                <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Click Here
                                </span>
                                <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Click Here
                                </span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'

type PlanCardType = {
  eyebrow: string
  title: string
  description: string
  link: string
}

const planData: PlanCardType[] = [
  {
    eyebrow: 'Personal Plans',
    title: 'Your safe space starts here.',
    description: "Whether you're feeling overwhelmed, unheard, or just need someone to talk to, our Personal Plans offer one to one sessions with compassionate listeners. No advice. No judgment. Just someone who truly listens, whenever you need.",
    link: '/service-detail/personal'
  },
  {
    eyebrow: 'Corporate Plans',
    title: "Support your team's mental wellbeing.",
    description: 'Our Corporate Plans are designed for organizations that value emotional health. Offer your employees access to safe, judgment free listening sessions that boost morale, reduce burnout, and create a culture of empathy. Custom packages available for teams of all sizes.',
    link: '/service-detail/corporate'
  }
]
</script>
