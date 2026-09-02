<template>
    <section class="pt-6 pb-10 md:pt-8 md:pb-14 lg:pt-10 lg:pb-16 relative bg-body-bg overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-3 size-[26rem] -top-32 end-1/4 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">

            <div class="text-center lg:mb-14 mb-10">
                <div class="eyebrow mb-5" data-reveal="soft">
                    Our Services
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    Real Conversations. Zero Judgment.
                </h2>

                <div class="mx-auto lg:max-w-[56ch]" data-reveal="up" style="--reveal-delay:120ms">
                    <p class="text-lg text-pretty">
                        The Feel Good Center offers one to one listening sessions led with warmth,
                        compassion, and zero judgment. Whether you're overwhelmed, lonely, stressed,
                        or just need to get something off your chest, we're here to hold space for you.
                    </p>

                    <p class="mt-6 text-lg font-medium text-default-950 text-balance">
                        No therapy. No fixing. Just listening, with heart.
                    </p>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5" data-reveal-group>

                <NuxtLink
                    v-for="(service, idx) in serviceData"
                    :key="idx"
                    :to="service.link"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-cream rounded-2xl p-7 pt-14 flex flex-col gap-6 border border-default-200/70 hover:border-primary/30"
                >
                    <!-- Watermark number, sits behind everything -->
                    <span class="pointer-events-none absolute -top-3 end-4 font-heading text-7xl text-default-950/[0.04] transition-all duration-700 ease-soft group-hover:text-pink/10 group-hover:-translate-y-1">
                        {{ service.number }}
                    </span>

                    <div class="relative">
                        <span v-if="service.duration"
                              class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                            <Icon icon="tabler:clock" class="size-3.5" />
                            {{ service.duration }}
                        </span>

                        <h3 class="mb-2 text-2xl h-display">{{ service.title }}</h3>
                        <p class="text-default-600">{{ service.description }}</p>
                    </div>

                    <div class="relative mt-auto flex items-center gap-2 font-medium text-default-950">
                        <span class="relative">
                            Learn More
                            <span class="absolute -bottom-0.5 start-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100"></span>
                        </span>
                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 -rotate-45 transition-transform duration-500 ease-soft group-hover:rotate-0 group-hover:translate-x-1" />
                    </div>
                </NuxtLink>

                <!-- Sixth cell: catches anyone who didn't see themselves in the five above -->
                <NuxtLink
                    to="/contact"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden rounded-2xl p-7 pt-14 flex flex-col justify-between gap-6 bg-linear-to-br from-cream via-pastel-soft to-pastel/70 border border-pastel/35"
                >
                    <div class="aura animate-breathe size-52 -bottom-16 -end-10 bg-pastel/60"></div>

                    <div class="relative">
                        <h3 class="mb-2 text-2xl h-display">Not sure which one?</h3>
                        <p class="text-default-600">Tell us what's going on and we'll suggest the right starting point. No pressure either way.</p>
                    </div>

                    <div class="relative mt-auto inline-flex items-center gap-2 font-medium">
                        <span>Start a conversation</span>
                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1.5" />
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type ServiceType = {
  number: string
  title: string
  duration?: string
  description: string
  link: string
}

const serviceData: ServiceType[] = [
  {
    number: '01.',
    title: 'First Feel-Good Conversation',
    duration: '30 min',
    description: "A gentle first step. See how it feels to be listened to, with nothing expected of you after.",
    link: '/service-detail/personal'
  },
  {
    number: '02.',
    title: 'Feel-Good Listening Session',
    duration: '50 min',
    description: "Our core session. Room to say the whole thing, not just the headline.",
    link: '/service-detail/personal'
  },
  {
    number: '03.',
    title: 'Deep Listening Session',
    duration: '75 min',
    description: 'For the heavier things that take a while to reach. No clock watching, no rushing.',
    link: '/service-detail/personal'
  },
  {
    number: '04.',
    title: 'Emotional Check-In Plans',
    description: 'Weekly or monthly. Not just support, but consistent care from someone who remembers.',
    link: '/service-detail/personal'
  },
  {
    number: '05.',
    title: 'Gift a Session',
    description: 'Because everyone deserves to be heard. Give someone an hour that is entirely theirs.',
    link: '/service-detail/personal'
  }
]
</script>
