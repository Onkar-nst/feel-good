<template>
    <section class="relative pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16 bg-cream overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-3 size-[26rem] -top-32 end-1/4 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">

            <div class="text-center lg:mb-14 mb-10">
                <div class="eyebrow mb-5" data-reveal="soft">
                    The Service
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    Real Conversations. Zero Judgment.
                </h2>

                <div class="mx-auto lg:max-w-[62ch] space-y-2.5" data-reveal="up" style="--reveal-delay:120ms">
                    <p>The Feel Good Centre offers one to one listening sessions led with warmth, compassion, and zero judgment.</p>
                    <p class="text-default-950 font-medium">No therapy. No fixing. Just listening, with heart.</p>
                </div>
            </div>

            <!-- ── How a session works ──────────────────────────────── -->
            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mb-5" data-reveal-group>
                <div
                    v-for="(step, idx) in stepData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-white rounded-2xl p-7 pt-14 flex flex-col gap-6 border border-default-200/70 hover:border-primary/30"
                >
                    <!-- Watermark number, sits behind everything -->
                    <span class="pointer-events-none absolute -top-3 end-4 font-heading text-7xl text-default-950/[0.04] transition-all duration-700 ease-soft group-hover:text-pink/10 group-hover:-translate-y-1">
                        {{ step.number }}
                    </span>

                    <div class="relative">
                        <span class="mb-4 flex size-11 items-center justify-center rounded-full bg-mint-soft text-mint">
                            <Icon :icon="step.icon" class="size-5.5" />
                        </span>

                        <h3 class="mb-2 text-2xl h-display">{{ step.title }}</h3>
                        <p class="text-default-600">{{ step.description }}</p>
                    </div>
                </div>
            </div>

            <!-- ── What you can book, and what this isn't ───────────── -->
            <div class="grid lg:grid-cols-5 gap-5">

                <div class="lg:col-span-3 rounded-2xl border border-default-200/70 bg-white p-7 lg:p-9" data-reveal="up">
                    <h3 class="h-display text-2xl mb-6">Ways people book</h3>

                    <ul role="list" class="space-y-4" data-reveal-group>
                        <li v-for="(offer, idx) in offerData" :key="idx"
                            data-reveal="left"
                            class="group flex items-start gap-4 border-b border-default-200 pb-4 last:border-0 last:pb-0">
                            <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-ink transition-transform duration-500 ease-soft group-hover:scale-110">
                                <Icon icon="tabler:check" class="size-3.5" />
                            </span>

                            <div>
                                <div class="text-default-950 font-medium">{{ offer.title }}</div>
                                <p class="text-sm text-default-600">{{ offer.description }}</p>
                            </div>
                        </li>
                    </ul>

                    <NuxtLink to="/contact" class="btn-primary btn-fill btn-lg group mt-8">
                        <span>Book a Session</span>
                        <Icon icon="tabler:arrow-right"
                              class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </NuxtLink>
                </div>

                <div class="lg:col-span-2 card-lift group relative overflow-hidden rounded-2xl p-7 lg:p-9 bg-mint text-mint-ink" data-reveal="up" style="--reveal-delay:120ms">
                    <div class="aura animate-breathe size-52 -bottom-16 -end-10 bg-white/40"></div>

                    <div class="relative">
                        <h3 class="h-display text-2xl text-mint-ink mb-2">And what this isn't</h3>

                        <p class="text-mint-ink/75 mb-6">
                            Being clear about this matters as much as anything we do offer.
                        </p>

                        <ul role="list" class="space-y-3">
                            <li v-for="(item, idx) in notData" :key="idx" class="flex items-start gap-3">
                                <Icon icon="tabler:x" class="mt-1 size-4 shrink-0 text-mint-ink/50" />
                                <span class="text-mint-ink/80">{{ item }}</span>
                            </li>
                        </ul>

                        <p class="mt-6 pt-5 border-t border-mint-ink/15 text-sm text-mint-ink/75">
                            Listening helps, but it isn't treatment. If you're in immediate distress, please call
                            Tele MANAS on 14416. It's free and open 24 hours a day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type StepType = { number: string, icon: string, title: string, description: string }
type OfferType = { title: string, description: string }

const stepData: StepType[] = [
  {
    number: '01.',
    icon: 'tabler:calendar-heart',
    title: 'You book a time',
    description: "Pick a slot that suits you. A first name is enough, and it doesn't have to be your real one."
  },
  {
    number: '02.',
    icon: 'tabler:device-mobile-message',
    title: 'We meet, your way',
    description: 'A video or voice call, wherever you feel most comfortable. Plenty of people choose voice only, camera off.'
  },
  {
    number: '03.',
    icon: 'tabler:message-circle-heart',
    title: 'You talk. We listen.',
    description: "No script and no agenda. Go quiet, cry, or say nothing at all. You set the pace and nobody will rush you."
  }
]

const offerData: OfferType[] = [
  { title: '1:1 Virtual Listening Sessions', description: "Release what's heavy, safely and freely." },
  { title: 'Weekly & Monthly Check In Plans', description: 'Not just support. Consistent care.' },
  { title: 'Follow Up Sessions', description: 'A shorter catch up for people who return.' },
  { title: 'Gift a Session', description: 'Because everyone deserves to be heard.' },
  { title: 'Corporate Plans', description: 'Listening space for teams that carry a lot quietly.' }
]

const notData: string[] = [
  'Not therapy, and not a diagnosis',
  'Not coaching, advice, or homework',
  'Not recorded, written down, or repeated',
  'Not a place you have to keep coming back to'
]
</script>
