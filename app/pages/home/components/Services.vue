<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative bg-body-bg overflow-hidden">

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
                        The Feel Good Centre offers one to one listening sessions led with warmth,
                        compassion, and zero judgment. Whether you're overwhelmed, lonely, stressed,
                        or just need to get something off your chest, we're here to hold space for you.
                    </p>

                    <p class="mt-6 text-lg font-medium text-default-950 text-balance">
                        No therapy. No fixing. Just listening, with heart.
                    </p>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6" data-reveal-group>

                <article
                    v-for="(service, idx) in serviceData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift group relative flex flex-col overflow-hidden rounded-2xl bg-cream border border-default-200/70 hover:border-primary/30"
                >
                    <!-- Image, deliberately a shallow band: it sets the mood without
                         pushing the price and CTA below the fold of the card. -->
                    <div class="relative h-40 md:h-44 shrink-0 overflow-hidden bg-default-100">
                        <img :src="service.image" :alt="service.imageAlt ?? service.title" loading="lazy"
                             class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105" />

                        <!-- Keeps the chips legible over any part of a photo -->
                        <div class="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-default-950/30 to-transparent"></div>

                        <span v-if="service.duration"
                              class="absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-default-950 backdrop-blur-sm">
                            <Icon icon="tabler:clock" class="size-3.5" />
                            {{ service.duration }}
                        </span>

                        <span v-if="service.badge"
                              class="absolute top-3 end-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-ink shadow-sm">
                            {{ service.badge }}
                        </span>
                    </div>

                    <!-- Body -->
                    <div class="flex flex-1 flex-col p-6">
                        <h3 class="h-display text-xl mb-2">{{ service.title }}</h3>
                        <p class="text-sm text-default-600">{{ service.description }}</p>

                        <!-- mt-auto pins the price and CTA to the bottom, so cards of
                             differing copy length still line up across the row. -->
                        <div class="mt-auto pt-5">
                            <div class="flex items-baseline justify-between gap-3 border-t border-default-200 pt-4">
                                <div class="flex items-baseline gap-1.5">
                                    <span class="h-display text-2xl leading-none">{{ service.price }}</span>
                                    <span class="text-xs text-default-500">{{ service.priceLabel ?? '' }}</span>
                                </div>

                                <NuxtLink :to="service.link"
                                          class="text-sm text-default-500 underline underline-offset-4 decoration-default-300 transition-colors hover:text-default-950 hover:decoration-primary">
                                    Details
                                </NuxtLink>
                            </div>

                            <CalendlyButton :url="service.calendlyUrl" icon=""
                                            button-class="btn-primary btn-fill btn-md group mt-4 w-full">
                                Book this session
                            </CalendlyButton>
                        </div>
                    </div>
                </article>

                <!-- Sixth cell: catches anyone who didn't see themselves in the five above -->
                <NuxtLink
                    to="/contact"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden rounded-2xl p-7 flex flex-col justify-center gap-4 bg-linear-to-br from-cream via-lagoon-soft to-lagoon/70 border border-lagoon/35"
                >
                    <div class="aura animate-breathe size-52 -bottom-16 -end-10 bg-lagoon/60"></div>

                    <div class="relative">
                        <h3 class="mb-2 text-2xl h-display">Not sure which one?</h3>
                        <p class="text-default-600">Tell us what's going on and we'll suggest the right starting point. No pressure either way.</p>
                    </div>

                    <div class="relative inline-flex items-center gap-2 font-medium">
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
import CalendlyButton from '~/components/CalendlyButton.vue'
import { CALENDLY_URL, EVENT_TYPES } from '~/utils/calendly'
import type { BookableService } from '~/types/booking'

type ServiceType = BookableService & {
  description: string
  imageAlt?: string
  link: string
  priceLabel?: string
  badge?: string
  /** Straight to this session's calendar where one exists, else the account page. */
  calendlyUrl: string
}

const serviceData: ServiceType[] = [
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
</script>
