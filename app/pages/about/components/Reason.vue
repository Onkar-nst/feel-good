<template>
    <section class="relative pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16 overflow-hidden">
        <div class="container max-w-315!">

            <div class="relative overflow-hidden rounded-3xl bg-pink grain lg:p-16 md:p-12 p-7">

                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-[30rem] -top-32 -end-24 bg-white/45"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-24 -start-20 bg-primary-soft/60"></div>
                </div>

                <div class="relative grid lg:grid-cols-2 lg:gap-16 gap-10">

                    <div>
                        <div class="eyebrow mb-5 text-pink-ink/70!" data-reveal="soft">
                            The Reason
                        </div>

                        <h2 class="h-display text-pink-ink lg:text-5xl md:text-4xl text-3xl mb-6" data-reveal="up">
                            Born from a quiet loneliness we kept noticing
                        </h2>

                        <div class="space-y-4 text-pink-ink/85" data-reveal-group>
                            <p data-reveal="up">
                                This service was born from the heart, from witnessing the quiet loneliness in so
                                many people, despite the noise of the world around them.
                            </p>

                            <p data-reveal="up">
                                Whether you're going through a tough phase, feeling overwhelmed, or you just need
                                a space to talk about your day without filters, we're here for you. If you've been
                                carrying too much in silence, please know that you don't have to anymore.
                            </p>

                            <p class="text-pink-ink text-lg" data-reveal="up">
                                Even one session can bring a sense of ease and clarity.
                            </p>
                        </div>
                    </div>

                    <!-- The four things people tell us they actually need -->
                    <div class="lg:pt-16">
                        <ul role="list" class="space-y-4" data-reveal-group>
                            <li v-for="(point, idx) in pointData" :key="idx"
                                data-reveal="left"
                                class="group flex items-start gap-4 rounded-xl p-3 -m-3 transition-colors duration-500 hover:bg-white/25">
                                <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/70 text-pink-ink transition-all duration-500 ease-soft group-hover:bg-white group-hover:scale-110">
                                    <Icon icon="tabler:check" class="size-3.5" />
                                </span>
                                <span class="text-lg text-pink-ink/85 transition-colors duration-500 group-hover:text-pink-ink">{{ point }}</span>
                            </li>
                        </ul>

                        <div class="mt-10 flex flex-wrap items-center gap-4" data-reveal="up">
                            <NuxtLink to="/contact" class="btn-light btn-lg group">
                                <span>Book a Session</span>
                                <Icon icon="tabler:arrow-right"
                                      class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </NuxtLink>

                            <span class="text-sm text-pink-ink/65">Confidential &middot; No judgment</span>
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

const pointData: string[] = [
  "You don't always need advice.",
  'You don’t need to “have it all together.”',
  'You just need someone who gets it.',
  'Someone who listens. Without interrupting, without judging.'
]
</script>
