<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container max-w-315!">

            <div class="relative overflow-hidden rounded-3xl bg-periwinkle grain" data-reveal="scale">

                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-96 -top-28 -start-20 bg-white/45"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-24 start-1/3 bg-primary-soft/60"></div>
                </div>

                <div class="relative grid lg:grid-cols-2 items-stretch">

                    <!-- ── Copy ─────────────────────────────────────── -->
                    <div class="lg:p-14 md:p-10 p-7">
                        <div class="eyebrow mb-5 text-periwinkle-ink/70!">
                            For Organisations
                        </div>

                        <h2 class="h-display text-periwinkle-ink lg:text-4xl md:text-3xl text-2xl mb-4">
                            Corporate Emotional Wellbeing
                        </h2>

                        <p class="text-periwinkle-ink/85 mb-8">
                            Your people carry more than their workload. We bring the same confidential,
                            judgment free listening into teams, so nobody has to hold it together alone
                            just to get through the week.
                        </p>

                        <ul role="list" class="space-y-3.5 mb-9" data-reveal-group>
                            <li v-for="(item, idx) in offeringData" :key="idx"
                                data-reveal="left"
                                class="group flex items-start gap-3.5">
                                <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/70 text-periwinkle-ink transition-all duration-500 ease-soft group-hover:bg-white group-hover:scale-110">
                                    <Icon icon="tabler:check" class="size-3.5" />
                                </span>
                                <span class="text-periwinkle-ink/85 transition-colors duration-500 group-hover:text-periwinkle-ink">{{ item }}</span>
                            </li>
                        </ul>

                        <div class="flex flex-wrap items-center gap-4">
                            <NuxtLink to="/contact" class="btn-light btn-lg group">
                                <span>Talk to Us About Your Team</span>
                                <Icon icon="tabler:arrow-right"
                                      class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </NuxtLink>
                        </div>

                        <p class="mt-7 text-sm text-periwinkle-ink/65">
                            Sessions stay between us and your people. Organisations never hear what was said.
                        </p>
                    </div>

                    <!-- ── Image ────────────────────────────────────── -->
                    <div class="group relative overflow-hidden lg:min-h-[28rem] min-h-64 lg:rounded-none rounded-b-3xl">
                        <img src="/images/other/contact-info.jpg" alt="The city our people work in"
                             class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

const offeringData: string[] = [
  'Confidential 1:1 listening sessions for employees',
  'Ongoing check in plans for high pressure teams',
  'A quiet outlet alongside whatever EAP you already run',
  'Onboarding and rollout handled with your people team'
]
</script>
