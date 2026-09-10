<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 relative overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-1 size-[28rem] -top-32 -end-28 bg-peach-soft/70"></div>
            <div class="aura animate-breathe delay-3 size-72 -bottom-20 -start-20 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        What We Stand For
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        The principles behind the hour
                    </h2>
                </div>

                <p class="lg:max-w-[40ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Five things that shape every session, and don't change no matter who
                    is sitting on the other side of the call.
                </p>
            </div>

            <!-- ── Values ───────────────────────────────────────────── -->
            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-5" data-reveal-group>
                <div
                    v-for="(value, idx) in valueData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-white rounded-2xl p-6 border border-default-200/70 hover:border-primary/30"
                >
                    <span class="relative mb-5 flex size-11 items-center justify-center rounded-full bg-peach-soft text-peach transition-transform duration-500 ease-soft group-hover:scale-110">
                        <Icon :icon="value.icon" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <h3 class="mb-1.5 text-lg h-display leading-snug">{{ value.title }}</h3>
                        <p class="text-sm text-default-600">{{ value.description }}</p>
                    </div>
                </div>

                <!-- Sixth cell keeps the grid whole and carries the confidentiality promise -->
                <div class="relative overflow-hidden rounded-2xl bg-peach-soft border border-peach/35 p-6 flex flex-col justify-center"
                     data-reveal="up">
                    <div class="aura animate-breathe size-44 -bottom-14 -end-8 bg-peach/50"></div>

                    <div class="relative">
                        <Icon icon="tabler:lock" class="mb-4 size-6 text-peach-ink" />
                        <h3 class="mb-1.5 text-lg h-display leading-snug">Nothing leaves the room</h3>
                        <p class="text-sm text-default-600">
                            Nothing is recorded, written down, or repeated. What you say here stays here.
                        </p>
                    </div>
                </div>
            </div>

            <!-- ── Mission & vision ─────────────────────────────────── -->
            <div class="grid md:grid-cols-2 gap-5">
                <div class="card-lift card-wash group relative overflow-hidden border border-default-200 rounded-2xl p-7 lg:p-9 bg-cream hover:border-primary/30"
                     data-reveal="up">
                    <span class="relative mb-6 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <Icon icon="tabler:target-arrow" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <div class="eyebrow mb-2.5">Our Commitment</div>
                        <h3 class="h-display text-2xl mb-4">Mission</h3>
                        <p class="text-lg text-default-800">
                            To provide a compassionate and confidential space where people feel truly
                            heard, supported, and emotionally lighter through intentional, heartfelt
                            listening.
                        </p>
                    </div>
                </div>

                <div class="card-lift card-wash group relative overflow-hidden border border-default-200 rounded-2xl p-7 lg:p-9 bg-cream hover:border-primary/30"
                     data-reveal="up" style="--reveal-delay:120ms">
                    <span class="relative mb-6 flex size-11 items-center justify-center rounded-full bg-peach-soft text-peach">
                        <Icon icon="tabler:eye-heart" class="size-5.5" />
                    </span>

                    <div class="relative">
                        <div class="eyebrow mb-2.5">Our Purpose</div>
                        <h3 class="h-display text-2xl mb-4">Vision</h3>
                        <p class="text-lg text-default-800 mb-4">
                            To normalise emotional expression and make being properly listened to
                            something anyone can reach, one conversation at a time.
                        </p>
                        <p class="text-default-600">
                            We started online so distance would never be the reason someone stayed
                            quiet. We're working toward rooms you can walk into.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

type ValueType = {
  icon: string
  title: string
  description: string
}

const valueData: ValueType[] = [
  {
    icon: 'tabler:heart-handshake',
    title: 'Compassion over correction',
    description: "You won't be told what you should have done differently."
  },
  {
    icon: 'tabler:seeding',
    title: 'Presence over performance',
    description: 'No script, no agenda, no rush to reach a tidy conclusion.'
  },
  {
    icon: 'tabler:ear',
    title: 'Listening over lecturing',
    description: 'Advice only if you ask for it. Most people find they never do.'
  },
  {
    icon: 'tabler:clock-heart',
    title: 'Connection over convenience',
    description: 'A real hour with one person, rather than whoever happens to be free.'
  },
  {
    icon: 'tabler:sparkles',
    title: 'Honesty and kindness',
    description: 'Warm, but never dishonest. You get a real person, not a soothing script.'
  }
]
</script>
