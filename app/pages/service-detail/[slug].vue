<template>
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="pt-10 md:pt-14 lg:pt-16 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[34rem] -top-44 -start-40 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-[26rem] top-1/4 -end-32 bg-peach-soft/70"></div>
        </div>

        <div class="container relative">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-10 items-center">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">{{ topic.hero.eyebrow }}</div>

                    <h1 class="h-display lg:text-[52px] md:text-5xl text-[34px] leading-[1.1] mb-5" data-reveal="up">
{{ topic.hero.heading }}
                    </h1>

                    <p class="text-lg text-default-600 mb-4" data-reveal="up" style="--reveal-delay:120ms">
{{ topic.hero.intro }}
                    </p>

                    <p class="text-lg text-default-800 mb-9" data-reveal="up" style="--reveal-delay:200ms">
{{ topic.hero.invitation }}
                    </p>

                    <div class="flex flex-wrap items-center gap-4" data-reveal="up" style="--reveal-delay:280ms">
                        <CalendlyButton :url="EVENT_TYPES.listening50">Book a Session</CalendlyButton>

                        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn-outline btn-lg group">
                            <Icon icon="tabler:brand-whatsapp" class="size-5" />
                            <span>Message us instead</span>
                        </a>
                    </div>

                    <p class="mt-6 text-sm text-default-500" data-reveal="up" style="--reveal-delay:360ms">
                        Confidential &middot; No judgment &middot; No obligation to continue
                    </p>
                </div>

                <div class="relative" data-reveal="scale">
                    <!-- Native 5:4, so the room and the light survive rather than being
                         cropped away by a portrait frame. -->
                    <div class="group relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl aspect-[5/4]">
                        <img :src="topic.hero.image"
                             :alt="topic.hero.imageAlt"
                             class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Recognition ──────────────────────────────────────────── -->
    <section class="pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24 relative overflow-hidden bg-peach-soft">
        <div class="container">
            <div class="mx-auto lg:max-w-5xl lg:mb-10 mb-8">
                <div class="eyebrow mb-6" data-reveal="soft">{{ topic.recognition.eyebrow }}</div>
                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl leading-[1.1] mb-5" data-reveal="up">
{{ topic.recognition.heading }}
                </h2>
                <p class="text-lg md:text-xl text-default-600 leading-relaxed" data-reveal="up" style="--reveal-delay:120ms">
{{ topic.recognition.intro }}
                </p>
            </div>

            <!-- Separate white cards on a warm ground, each opened by a short peach
                 accent bar. Cards lift gently on hover instead of changing colour. -->
            <div class="mx-auto grid md:grid-cols-2 gap-4 md:gap-5 lg:max-w-5xl" data-reveal-group>
                <div v-for="(sign, idx) in topic.recognition.signs" :key="idx"
                     data-reveal="up"
                     class="rounded-2xl bg-white px-6 py-5 md:px-7 md:py-6 transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(59,22,6,0.25)]">
                    <span class="block h-1 w-8 rounded-full bg-peach mb-4" aria-hidden="true"></span>
                    <p class="text-lg md:text-xl leading-snug text-default-950">{{ sign.text }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ── What this is, and what it is not ─────────────────────── -->
    <section class="pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24 relative overflow-hidden">
        <div class="container relative">
            <div class="mx-auto lg:max-w-[52ch] text-center lg:mb-16 mb-12">
                <div class="eyebrow mb-6" data-reveal="soft">Before you book</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl leading-[1.2] mb-5" data-reveal="up">
                    Being clear about what this is
                </h2>
                <p class="text-lg text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    No surprises, no small print. Here is exactly what a session
                    does and does not include.
                </p>
            </div>

            <!-- One ledger, split down the middle. The two halves share a single
                 frame so they read as one statement with two sides, and the big
                 Yes / No does the contrasting before a word of either list is read. -->
            <div class="mx-auto lg:max-w-5xl overflow-hidden rounded-3xl border border-default-200 bg-white grid md:grid-cols-2"
                 data-reveal="up">

                <div class="lg:p-10 p-7 md:border-e border-default-200">
                    <div class="flex items-baseline gap-4 mb-8">
                        <span class="h-display text-5xl lg:text-6xl leading-none text-default-950">Yes.</span>
                        <span class="text-sm uppercase tracking-[0.18em] text-default-500">What a session is</span>
                    </div>

                    <ol role="list" class="space-y-5">
                        <li v-for="(item, idx) in IS_LIST" :key="idx" class="flex items-start gap-4">
                            <span class="mt-1 font-heading text-sm tabular-nums text-peach-ink/60 w-6 shrink-0">
                                0{{ idx + 1 }}
                            </span>
                            <span class="text-lg leading-relaxed text-default-950">{{ item }}</span>
                        </li>
                    </ol>
                </div>

                <div class="lg:p-10 p-7 bg-cream border-t md:border-t-0 border-default-200">
                    <div class="flex items-baseline gap-4 mb-8">
                        <span class="h-display text-5xl lg:text-6xl leading-none text-default-400">No.</span>
                        <span class="text-sm uppercase tracking-[0.18em] text-default-500">What it is not</span>
                    </div>

                    <ol role="list" class="space-y-5">
                        <li v-for="(item, idx) in IS_NOT_LIST" :key="idx" class="flex items-start gap-4">
                            <span class="mt-1 font-heading text-sm tabular-nums text-default-400 w-6 shrink-0">
                                0{{ idx + 1 }}
                            </span>
                            <span class="text-lg leading-relaxed text-default-600">{{ item }}</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <!-- ── How a session goes ───────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-peach grain lg:p-14 md:p-10 p-7" data-reveal="scale">
                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-72 -top-24 -start-16 bg-white/15"></div>
                    <div class="aura animate-drift delay-2 size-64 -bottom-20 start-1/3 bg-primary-soft/20"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-white/70!">How a session goes</div>
                    <h2 class="h-display text-white lg:text-4xl md:text-3xl text-2xl mb-9 lg:max-w-[22ch]">
                        Time that belongs entirely to you
                    </h2>

                    <ol class="grid md:grid-cols-2 lg:grid-cols-4 gap-7" data-reveal-group>
                        <li v-for="(step, idx) in STEPS" :key="idx" data-reveal="up">
                            <span class="mb-4 flex size-9 items-center justify-center rounded-full bg-white/75 font-heading text-white">
                                {{ idx + 1 }}
                            </span>
                            <h3 class="h-display text-white! text-lg mb-2">{{ step.title }}</h3>
                            <p class="text-sm text-white/80">{{ step.body }}</p>
                        </li>
                    </ol>

                    <!-- The calendar the second step promises, opened in place -->
                    <div class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal="up">
                        <button type="button" @click="bookingOpen = true" class="btn-light btn-lg group">
                            <Icon icon="tabler:calendar-heart" class="size-5 shrink-0" />
                            <span>Book your slot</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-4 shrink-0 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                        </button>

                        <p class="text-sm text-white/75">
                            Real availability, confirmed straight away.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Proof ────────────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 bg-cream">
        <div class="container lg:max-w-3xl! text-center">
            <div class="eyebrow mb-6" data-reveal="soft">From someone who booked</div>

            <blockquote class="h-display lg:text-3xl md:text-2xl text-xl leading-snug text-default-950 mb-7" data-reveal="up">
&ldquo;{{ topic.quote.text }}&rdquo;
            </blockquote>

            <div class="flex items-center justify-center gap-3" data-reveal="up">
                <img :src="topic.quote.avatar" :alt="topic.quote.author" loading="lazy"
                     class="size-10 shrink-0 rounded-full object-cover object-top">
                <div class="text-start">
                    <div class="font-medium text-default-950">{{ topic.quote.author }}</div>
                    <div class="text-sm text-default-500">Verified session</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Sessions ─────────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-3 size-[26rem] -top-32 end-1/4 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">
            <SessionGrid />
        </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-10 md:pb-14 lg:pb-16 ">
        <div class="container lg:max-w-3xl!">
            <div class="lg:mb-10 mb-8 text-start md:text-center">
                <div class="eyebrow mb-5" data-reveal="soft">Common questions</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl" data-reveal="up">
                    The things people ask first
                </h2>
            </div>

            <div class="border-t border-default-200" data-reveal="up">
                <div v-for="(item, idx) in topic.faqs" :key="idx" class="border-b border-default-200">
                    <h3>
                        <button type="button"
                                :aria-expanded="openIndex === idx"
                                :aria-controls="`fo-faq-${idx}`"
                                class="group flex w-full items-start justify-between gap-5 py-5 text-start text-default-950 transition-colors duration-300 hover:text-default-600"
                                @click="toggle(idx)">
                            <span class="text-lg font-medium">{{ item.q }}</span>
                            <span class="relative mt-1.5 flex size-4 shrink-0 items-center justify-center transition-colors duration-300 group-hover:text-pink"
                                  :class="openIndex === idx ? 'text-pink' : 'text-default-400'"
                                  aria-hidden="true">
                                <span class="absolute h-px w-4 bg-current"></span>
                                <span class="absolute h-px w-4 bg-current transition-transform duration-500 ease-soft"
                                      :class="openIndex === idx ? 'rotate-0' : 'rotate-90'"></span>
                            </span>
                        </button>
                    </h3>

                    <div :id="`fo-faq-${idx}`"
                         class="grid transition-all duration-500 ease-soft"
                         :class="openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                        <div class="overflow-hidden">
                            <p class="pb-6 pe-8 text-default-600">{{ item.a }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Same credentials block as the About page, so a visitor who lands here
         from search sees the training and registration before the closing ask. -->
    <Credentials />

    <CtaSection />

    <BookingModal :open="bookingOpen" :service="bookingService" @close="bookingOpen = false" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { createError } from '#app'
import { useHead } from '#unhead/composables'
import CalendlyButton from '~/components/CalendlyButton.vue'
import CtaSection from '~/components/CtaSection.vue'
import Credentials from '~/components/Credentials.vue'
import BookingModal from '~/components/BookingModal.vue'
import SessionGrid from '~/components/SessionGrid.vue'
import { EVENT_TYPES } from '~/utils/calendly'
import type { BookableService } from '~/types/booking'
import { findTopic, IS_LIST, IS_NOT_LIST, STEPS } from '~/data/serviceTopics'

/*
 * One route renders every per problem landing page from `~/data/serviceTopics`
 * (CLIENT-NOTES section 5). The layout is the design signed off on the
 * "Feeling Overwhelmed" page; only the copy, imagery and search intent change,
 * so a new topic is a data entry rather than another hand built page.
 */

const route = useRoute()

const topic = computed(() => {
  const found = findTopic(String(route.params.slug))
  if (!found) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  return found
})

/* The session this page sells: the modal collects a few details, then hands
   over to the Calendly event type for that session. */
const bookingOpen = ref(false)
const bookingService: BookableService = {
  title: 'Feel-Good Listening Session',
  calendlyUrl: EVENT_TYPES.listening50,
  duration: '50 min',
  price: '₹1,799',
  image: '/images/service/session-core.jpg'
}

// First question starts open, so the column reads as answers rather than
// a list of closed headings. Reset when navigating between topics.
const openIndex = ref<number | null>(0)
const toggle = (idx: number) => { openIndex.value = openIndex.value === idx ? null : idx }
watch(() => topic.value.slug, () => { openIndex.value = 0 })

const whatsappLink = computed(() =>
  'https://wa.me/919004989199?text=' + encodeURIComponent(topic.value.whatsappText))

useHead({
  title: computed(() => `${topic.value.navTitle} | The Feel Good Centre`),
  meta: [{ name: 'description', content: computed(() => topic.value.metaDescription) }]
})
</script>
