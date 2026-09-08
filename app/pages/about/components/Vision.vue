<template>
    <section class="pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16">
        <div class="container">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Future &amp; Vision
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        Where We're Headed Next
                    </h2>
                </div>

                <p class="lg:max-w-[38ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    What we're building toward, and the principles that will shape it however far it grows.
                </p>
            </div>

            <!-- ── Mission & vision ─────────────────────────────────── -->
            <div class="grid md:grid-cols-2 gap-5 mb-5">
                <div class="card-lift card-wash group relative overflow-hidden border border-default-200 rounded-2xl p-7 lg:p-9 bg-white hover:border-primary/30"
                     data-reveal="up">
                    <span class="relative mb-6 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                        <Icon icon="tabler:target-arrow" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <div class="eyebrow mb-2.5">Our Commitment</div>
                        <h3 class="h-display text-2xl mb-4">Mission</h3>
                        <p class="text-lg text-default-800">
                            To provide a compassionate and confidential space where people feel truly heard,
                            supported, and emotionally lighter through intentional, heartfelt listening.
                        </p>
                    </div>
                </div>

                <div class="card-lift card-wash group relative overflow-hidden border border-default-200 rounded-2xl p-7 lg:p-9 bg-white hover:border-primary/30"
                     data-reveal="up" style="--reveal-delay:120ms">
                    <span class="relative mb-6 flex size-11 items-center justify-center rounded-full bg-peach-soft text-peach">
                        <Icon icon="tabler:eye-heart" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <div class="eyebrow mb-2.5">Our Purpose</div>
                        <h3 class="h-display text-2xl mb-4">Vision</h3>
                        <p class="text-lg text-default-800">
                            To normalize emotional expression and make authentic listening, free of judgment,
                            accessible to anyone who needs it, one conversation at a time.
                        </p>
                    </div>
                </div>
            </div>

            <!-- ── The road ahead ───────────────────────────────────── -->
            <div class="grid lg:grid-cols-5 gap-5">

                <div class="lg:col-span-2 relative group overflow-hidden rounded-2xl lg:h-auto h-72" data-reveal="scale">
                    <img src="/images/other/case-study.webp" alt="A calm space to talk"
                         class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    <div class="absolute inset-0 bg-linear-to-t from-default-950/60 to-transparent"></div>

                    <div class="absolute bottom-5 inset-x-5">
                        <p class="rounded-xl bg-white/95 backdrop-blur-sm p-4 text-sm text-default-800">
                            Started online. Built to become a room you can walk into.
                        </p>
                    </div>
                </div>

                <div class="lg:col-span-3 rounded-2xl border border-default-200 bg-cream p-7 lg:p-9" data-reveal="up">
                    <h3 class="h-display text-2xl mb-6">The Road Ahead</h3>

                    <ol role="list" class="relative space-y-7 ps-8" data-reveal-group>
                        <!-- The thread running through the milestones -->
                        <span class="absolute inset-y-2 start-[7px] w-px bg-default-300" aria-hidden="true"></span>

                        <li v-for="(milestone, idx) in milestoneData" :key="idx"
                            data-reveal="left"
                            class="relative">
                            <span class="absolute -start-8 top-1.5 size-3.5 rounded-full border-2 border-white bg-primary ring-1 ring-default-300" aria-hidden="true"></span>

                            <div class="text-default-950 font-medium mb-1">{{ milestone.title }}</div>
                            <p class="text-default-600">{{ milestone.description }}</p>
                        </li>
                    </ol>
                </div>
            </div>

            <!-- ── Values ───────────────────────────────────────────── -->
            <div class="mt-5 relative overflow-hidden rounded-2xl bg-peach grain lg:p-10 p-7">
                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift delay-1 size-80 -top-24 end-1/4 bg-white/50"></div>
                </div>

                <div class="relative mb-7.5">
                    <div class="eyebrow mb-2.5 text-peach-ink/70!">Core Principles</div>
                    <h3 class="h-display text-2xl text-peach-ink">Values That Drive Us</h3>
                </div>

                <ul role="list" class="relative grid md:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-4" data-reveal-group>
                    <li v-for="(value, idx) in valueData" :key="idx"
                        data-reveal="up"
                        class="group flex items-start gap-3">
                        <Icon icon="tabler:square-rounded-check"
                              class="mt-0.5 size-5 shrink-0 text-peach-ink/45 transition-colors duration-500 group-hover:text-peach-ink" />
                        <span class="text-peach-ink/85 transition-colors duration-500 group-hover:text-peach-ink">{{ value }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

type MilestoneType = { title: string, description: string }

const milestoneData: MilestoneType[] = [
  {
    title: 'A digital platform, first',
    description: 'The Feel Good Centre began online, catering to anyone who needed emotional support wherever they were.'
  },
  {
    title: 'Physical centres, next',
    description: 'Recognizing how hard it is to open up, we are working toward real spaces you can walk into and be heard in.'
  },
  {
    title: 'Room for creative expression',
    description: 'Beyond talking, we want to add spaces where feelings can be put into movement, sound, and making.'
  }
]

const valueData: string[] = [
  'Compassion over correction',
  'Presence over performance',
  'Listening over lecturing',
  'Connection over convenience',
  'Honesty, kindness, and confidentiality'
]
</script>
