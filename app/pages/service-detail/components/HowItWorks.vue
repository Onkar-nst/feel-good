<template>
    <section class="lg:py-27.5 md:py-25 py-15 bg-lagoon-soft">
        <div class="container">

            <div class="mb-12.5">
                <h2 class="text-lagoon-ink lg:text-5xl md:text-4xl text-3xl">How It Works</h2>
            </div>

            <div class="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-25 gap-10">
                <div v-for="(step, idx) in stepData" :key="idx">
                    <div class="mb-4 text-sm text-default-500">{{ step.number }}</div>
                    <h3 class="mb-2.5 text-xl text-lagoon-ink">{{ step.title }}</h3>
                    <p class="text-lagoon-ink/75">{{ step.description }}</p>
                </div>
            </div>

            <div class="lg:mt-17.5 mt-12.5">
                <div class="rounded-xl bg-default-800 lg:p-10 p-6">
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-7.5">
                        <div class="lg:max-w-3/5">
                            <h3 class="mb-4 text-2xl text-lagoon-ink">📞 Let's Create a Listening Culture</h3>

                            <div class="space-y-2.5 text-lagoon-ink/75">
                                <p>Whether you're looking to support burnout prevention, boost emotional resilience, or simply offer your team a safe space to talk, we're here to help.</p>

                                <p>Contact us to set up a custom plan or schedule a consultation.</p>
                            </div>
                        </div>

                        <NuxtLink to="/contact" class="group py-5 px-10 inline-flex text-nowrap items-center justify-center rounded-lg bg-white text-primary-ink font-medium transition-all">
                            <span class="relative block overflow-hidden">
                                <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Contact us
                                </span>
                                <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Contact us
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

type StepType = {
  number: string
  title: string
  description: string
}

const stepData: StepType[] = [
  { number: '1.', title: 'Discovery Call', description: "We understand your team's needs" },
  { number: '2.', title: 'Plan Setup', description: 'Choose a plan or customize one' },
  { number: '3.', title: 'Private Booking', description: 'Employees schedule their sessions confidentially' },
  { number: '4.', title: 'Check In & Insights', description: 'Optional updates help you track engagement' }
]
</script>
