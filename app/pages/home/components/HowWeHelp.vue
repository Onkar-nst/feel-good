<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative bg-body-bg overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift size-[30rem] -top-36 -start-32 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-80 -bottom-24 -end-16 bg-white"></div>
        </div>

        <div class="container relative">

            <div class="text-center lg:mb-14 mb-10">
                <div class="eyebrow mb-5" data-reveal="soft">
                    How The Feel Good Centre Helps
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    Need someone to talk to?
                </h2>

                <p class="mx-auto lg:max-w-[58ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Start wherever you are. Pick whichever one sounds most like you today,
                    and we'll take it from there. There's no wrong place to begin.
                </p>
            </div>

            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4" data-reveal-group>
                <NuxtLink
                    v-for="(feeling, idx) in feelingData"
                    :key="idx"
                    to="/contact"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-cream rounded-2xl p-6 flex flex-col gap-5 border border-default-200/70 hover:border-primary/30"
                >
                    <div class="relative flex items-center justify-between gap-3">
                        <span class="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-500 ease-soft group-hover:scale-110">
                            <Icon :icon="feeling.icon" class="size-5.5" />
                        </span>

                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 -rotate-45 text-default-400 transition-all duration-500 ease-soft group-hover:rotate-0 group-hover:translate-x-1 group-hover:text-pink" />
                    </div>

                    <div class="relative mt-auto">
                        <h3 class="mb-1.5 text-lg h-display leading-snug">{{ feeling.title }}</h3>
                        <p class="text-sm text-default-600">{{ feeling.description }}</p>
                    </div>
                </NuxtLink>
            </div>

            <p class="mt-8 text-center text-default-600" data-reveal="up">
                Not seeing yours? That's alright too.
                <NuxtLink to="/contact" class="text-default-950 font-medium underline decoration-primary decoration-2 underline-offset-4 transition-colors duration-300 hover:text-pink">
                    Just tell us what's going on.
                </NuxtLink>
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type FeelingType = { icon: string, title: string, description: string }

const feelingData: FeelingType[] = [
  {
    icon: 'tabler:brain',
    title: "I'm Feeling Overwhelmed",
    description: 'Everything at once, and no room to put any of it down.'
  },
  {
    icon: 'tabler:mood-sad',
    title: "I'm Lonely",
    description: 'Surrounded by people, and still nobody to really say it to.'
  },
  {
    icon: 'tabler:heart-broken',
    title: "I'm Going Through a Breakup",
    description: 'Somewhere to say the parts you have stopped saying out loud.'
  },
  {
    icon: 'tabler:briefcase',
    title: 'Work Is Getting Too Much',
    description: 'The pressure, the people, the quiet dread on a Sunday evening.'
  },
  {
    icon: 'tabler:home',
    title: "I'm Struggling With Family Pressure",
    description: 'Love and expectation tangled together, with no easy way to separate them.'
  },
  {
    icon: 'tabler:compass',
    title: "I'm Confused About My Career or Life",
    description: 'No answers here, but space to hear yourself think out loud.'
  },
  {
    icon: 'tabler:plane',
    title: "I'm Living Abroad & Missing Home",
    description: 'A familiar ear across the time zones, whenever it gets heavy.'
  },
  {
    icon: 'tabler:message-circle',
    title: 'I Just Need Someone to Talk To',
    description: 'No reason required. Wanting to be heard is reason enough.'
  }
]
</script>
