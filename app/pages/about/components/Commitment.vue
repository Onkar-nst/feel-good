<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 relative bg-cream overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift size-[30rem] -top-36 -start-32 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-80 -bottom-24 -end-16 bg-lagoon-soft/70"></div>
        </div>

        <div class="container relative">

            <div class="lg:mb-14 mb-10 text-center">
                <div class="eyebrow mb-5" data-reveal="soft">
                    Our Commitment
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                    Mission and Values of The Feel Good Centre
                </h2>
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
                        <h3 class="h-display text-2xl mb-4">Mission Statement</h3>
                        <p class="text-lg text-default-800">
                            To provide a compassionate and confidential space where people feel truly
                            heard, supported, and emotionally lighter through intentional, heart led
                            listening.
                        </p>
                    </div>
                </div>

                <div class="card-lift card-wash group relative overflow-hidden border border-default-200 rounded-2xl p-7 lg:p-9 bg-white hover:border-primary/30"
                     data-reveal="up" style="--reveal-delay:120ms">
                    <span class="relative mb-6 flex size-11 items-center justify-center rounded-full bg-lagoon-soft text-lagoon">
                        <Icon icon="tabler:eye-heart" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <div class="eyebrow mb-2.5">Our Purpose</div>
                        <h3 class="h-display text-2xl mb-4">Vision Statement</h3>
                        <p class="text-lg text-default-800">
                            To normalise emotional expression and make authentic, non judgmental
                            listening accessible to anyone who needs it, one conversation at a time.
                        </p>
                    </div>
                </div>
            </div>

            <!-- ── Values ───────────────────────────────────────────── -->
            <div class="rounded-2xl border border-lagoon/35 bg-lagoon-soft lg:p-10 p-7 relative overflow-hidden"
                 data-reveal="up">
                <div class="aura animate-breathe delay-1 size-72 -top-20 end-1/4 bg-white/70" aria-hidden="true"></div>

                <div class="relative mb-8">
                    <div class="eyebrow mb-2.5">Core Principles</div>
                    <h3 class="h-display text-2xl">Values That Drive Us</h3>
                </div>

                <ul role="list" class="relative grid lg:grid-cols-3 md:grid-cols-2 gap-4" data-reveal-group>
                    <li v-for="(value, idx) in valueData" :key="idx"
                        data-reveal="up"
                        class="group flex items-start gap-3.5 rounded-xl bg-white/70 p-5 transition-colors duration-500 hover:bg-white">
                        <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lagoon/40 text-lagoon-ink transition-transform duration-500 ease-soft group-hover:scale-110">
                            <Icon icon="tabler:check" class="size-3.5" />
                        </span>
                        <span class="text-default-800">{{ value }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const valueData: string[] = [
  'Compassion over correction',
  'Presence over performance',
  'Listening over lecturing',
  'Connection over convenience',
  'Honesty, kindness, and confidentiality'
]
</script>
