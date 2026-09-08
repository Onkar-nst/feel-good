<template>
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

                    <button type="button" @click="openBooking(service)"
                            class="btn-primary btn-fill btn-md group/btn mt-4 w-full">
                        <span>Book this session</span>
                        <Icon icon="tabler:arrow-right"
                              class="size-4 transition-transform duration-500 ease-soft group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </article>

        <!-- Sixth cell: catches anyone who didn't see themselves in the five above -->
        <NuxtLink
            to="/contact"
            data-reveal="up"
            class="card-lift group relative overflow-hidden rounded-2xl p-7 flex flex-col justify-center gap-4 bg-peach-soft border border-peach/35"
        >
            <div class="aura animate-breathe size-44 -bottom-14 -end-8 bg-peach/20"></div>

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

        <BookingModal :open="bookingOpen" :service="activeService" @close="bookingOpen = false" />
    </div>
</template>

<script setup lang="ts">
/*
 * The five bookable sessions plus the "not sure which one?" cell, as one
 * component so the home page and every service detail page show the same
 * cards from the same data instead of drifting apart.
 */
import { NuxtLink } from '#components'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import BookingModal from '~/components/BookingModal.vue'
import { serviceData, type ServiceType } from '~/data/sessions'

const bookingOpen = ref(false)
const activeService = ref<ServiceType | null>(null)

function openBooking(service: ServiceType) {
  activeService.value = service
  bookingOpen.value = true
}
</script>
