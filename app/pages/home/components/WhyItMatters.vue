<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">

        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[32rem] -top-40 -end-32 bg-pastel/55"></div>
            <div class="aura animate-drift delay-2 size-80 bottom-0 -start-24 bg-white"></div>
        </div>

        <div class="container max-w-315! relative">
            <div class="grid lg:grid-cols-7 lg:gap-20 gap-10">

                <div class="lg:col-span-3" data-reveal="scale">
                    <div class="group relative rounded-2xl overflow-hidden lg:h-full md:h-100 size-full">
                        <NuxtLink to="/contact" class="absolute inset-0 z-10" aria-label="Book a session"></NuxtLink>

                        <img src="/images/other/work-step.jpg" alt="A quiet moment before a session"
                             class="lg:absolute lg:inset-0 rounded-2xl size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">

                        <div class="absolute inset-0 bg-linear-to-t from-default-950/60 to-transparent"></div>

                        <div class="absolute bottom-5 inset-x-5 text-center">
                            <div class="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm py-2.5 px-5 text-sm text-default-950">
                                Carrying too much in silence?
                                <span class="font-medium text-pink underline underline-offset-2">Let's talk</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4">
                    <div class="flex flex-col lg:gap-20 md:gap-12 gap-10 h-full">
                        <div>
                            <div class="eyebrow mb-5" data-reveal="soft">
                                Why It Matters
                            </div>

                            <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-8" data-reveal="up">
                                You don't have to hold it alone
                            </h2>

                            <ul role="list" class="space-y-4" data-reveal-group>
                                <li v-for="(point, idx) in pointData" :key="idx"
                                    data-reveal="left"
                                    class="group flex items-start gap-4 rounded-xl p-3 -m-3 transition-colors duration-500 hover:bg-pastel/15">
                                    <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-pastel/35 text-pastel-ink transition-all duration-500 ease-soft group-hover:bg-primary group-hover:text-primary-ink group-hover:scale-110">
                                        <Icon icon="tabler:check" class="size-3.5" />
                                    </span>
                                    <span class="text-lg text-default-600 transition-colors duration-500 group-hover:text-default-950">{{ point }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-auto" data-reveal="up">
                            <div class="flex flex-wrap items-center justify-between gap-5 p-2 md:ps-7 rounded-2xl bg-pastel-soft border border-pastel/45">
                                <p class="text-default-950 lg:max-w-1/2">Reach out to us today and book your session to release the feelings you've been holding onto!</p>

                                <NuxtLink to="/contact" class="btn-primary btn-fill btn-lg group text-nowrap">
                                    <span>Book a Session</span>
                                    <Icon icon="tabler:arrow-right"
                                          class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                                </NuxtLink>
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

const pointData: string[] = [
  "You don't always need advice.",
  'You don’t need to “have it all together.”',
  'You just need someone who gets it.',
  'Someone who listens. Without interrupting, without judging.'
]
</script>
