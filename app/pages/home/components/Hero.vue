<template>
    <section class="pt-12 md:pt-20 pb-6 md:pb-7 lg:pb-8 relative size-full overflow-hidden">

        <!-- Ambient colour fields. Slow, low-contrast, purely atmospheric. -->
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[38rem] -top-40 -start-52 bg-primary-soft/70"></div>
            <div class="aura animate-drift delay-2 size-[30rem] top-1/3 -end-40 bg-white"></div>
            <div class="aura animate-breathe delay-1 size-72 bottom-0 start-1/3 bg-cream-deep"></div>
        </div>

        <div class="container relative">
            <div class="grid lg:grid-cols-2 lg:gap-20 md:gap-16 gap-10">

                <!-- ── Copy ─────────────────────────────────────────── -->
                <div class="flex flex-col lg:gap-14 gap-9 h-full">
                    <div>
                        <div class="eyebrow mb-6" data-reveal="soft">
                            Fully, Truly, Kindly.
                        </div>

                        <h1 class="h-display lg:text-[64px] md:text-5xl text-[38px] leading-[1.08] mb-5">
                            <span class="block" data-reveal="up" style="--reveal-delay:80ms">A Safe Space</span>
                            <span class="block relative w-fit" data-reveal="up" style="--reveal-delay:200ms">
                                To Be Heard
                                <!-- Hand-drawn stroke that draws itself once the line lands -->
                                <svg class="underline-stroke absolute -bottom-2 start-0 w-full h-3.5 text-pink/45 overflow-visible"
                                     viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden="true">
                                    <path d="M2 9.5C48 4 106 2.5 160 4.5c42 1.6 92 5 138 2"
                                          stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p class="text-lg text-default-600 lg:max-w-[46ch]" data-reveal="up" style="--reveal-delay:320ms">
                            A safe, judgment free space to talk, express, and feel lighter.
                            One session. One conversation. One step toward emotional ease.
                        </p>

                        <div class="mt-9 flex flex-wrap items-center gap-4" data-reveal="up" style="--reveal-delay:420ms">
                            <NuxtLink to="/contact" class="btn-primary btn-fill btn-lg group">
                                <span>Book a Session</span>
                                <Icon icon="tabler:arrow-right"
                                      class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </NuxtLink>

                            <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"
                               class="btn-outline btn-lg group">
                                <Icon icon="tabler:brand-whatsapp" class="size-5" />
                                <span>Talk to us now</span>
                            </a>
                        </div>
                    </div>

                    <!-- ── Proof strip ──────────────────────────────── -->
                    <div class="mt-auto flex flex-wrap items-end justify-between gap-8 pt-8 border-t border-default-200"
                         data-reveal-group>
                        <div data-reveal="up">
                            <div ref="yearsEl" class="mb-1 text-4xl h-display tabular-nums">{{ years }}+</div>
                            <div class="text-sm text-default-500">Years Of Experience</div>
                        </div>

                        <div data-reveal="up">
                            <div ref="clientsEl" class="mb-1 text-4xl h-display tabular-nums">{{ clients }}+</div>
                            <div class="text-sm text-default-500">Happy Clients</div>
                        </div>

                        <div class="lg:w-2/5" data-reveal="up">
                            <p class="text-default-950 font-medium">No therapy. No fixing. Just listening, with heart.</p>
                        </div>
                    </div>
                </div>

                <!-- ── Collage ──────────────────────────────────────── -->
                <div class="grid md:grid-cols-2 gap-3.5" data-reveal-group>
                    <div class="hero-image-one-wrap relative group overflow-hidden rounded-2xl" data-reveal="scale">
                        <img class="size-full object-cover rounded-2xl transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]"
                             src="/images/other/hero-calm-1.jpg"
                             alt="Two friends laughing together outdoors">
                        <div class="absolute inset-0 rounded-2xl bg-linear-to-t from-default-950/25 to-transparent"></div>
                    </div>

                    <div class="flex h-full flex-col gap-3.5">
                        <!-- Featured review -->
                        <div class="relative shrink-0 overflow-hidden rounded-2xl bg-primary p-6 grain" data-reveal="scale">
                            <Icon icon="tabler:quote"
                                  class="absolute -top-1 end-3 size-16 text-primary-ink/15 rotate-180" />

                            <p class="relative mb-16 text-primary-ink">
                                At times you just want someone to listen to you and not fix any problems.
                                Kinjal exactly does that. Overall a great experience.
                            </p>

                            <div class="relative flex items-center gap-3.5">
                                <img src="/images/reviews/jinal.jpg" loading="lazy" alt="Jinal"
                                     class="size-11 rounded-full object-cover object-top ring-2 ring-primary-ink/15">
                                <div>
                                    <div class="text-primary-ink font-medium">Jinal</div>
                                    <div class="text-sm text-primary-ink/65">December 5, 2025</div>
                                </div>
                            </div>
                        </div>

                        <!-- Grows to absorb the leftover height so the collage bottoms out level with the portrait -->
                        <div class="relative min-h-0 flex-1 overflow-hidden rounded-2xl" data-reveal="scale">
                            <img src="/images/other/about-bg.jpg" alt=""
                                 class="rounded-2xl object-cover size-full">

                            <div class="absolute inset-0 m-6 text-center">
                                <div class="animate-float inline-block rounded-full bg-white/85 backdrop-blur-sm py-2.5 px-4 text-sm font-medium text-default-950 shadow-sm">
                                    You're not alone in how you feel
                                </div>

                                <img src="/images/other/cafe-conversation.jpg"
                                     alt="Two friends talking over coffee at a cafe table"
                                     class="mt-4 rounded-xl">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'
import { useCountUp } from '~/composables/useCountUp'

const { el: yearsEl, value: years } = useCountUp(7, 1100)
const { el: clientsEl, value: clients } = useCountUp(2200, 2000)

const whatsappLink =
  'https://wa.me/919004989199?text=' +
  encodeURIComponent("Hi! I'd like to know more about booking a listening session.")
</script>
