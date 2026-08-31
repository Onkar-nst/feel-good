<template>
    <section class="relative overflow-hidden border-y border-default-200 bg-body-bg lg:py-14 py-10">

        <div class="container mb-7 text-center">
            <p class="text-sm tracking-[0.14em] uppercase text-default-500" data-reveal="soft">
                Things people bring here
            </p>
        </div>

        <!-- Two rows drifting in opposite directions. Hovering pauses both,
             so anyone who spots their own sentence can actually read it. -->
        <div class="marquee relative" role="presentation">
            <div class="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-linear-to-r from-body-bg to-transparent"></div>
            <div class="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-linear-to-l from-body-bg to-transparent"></div>

            <div class="marquee-track gap-3.5">
                <span v-for="(phrase, idx) in [...rowOne, ...rowOne]" :key="`a-${idx}`"
                      class="shrink-0 rounded-full border border-default-200 bg-white px-5 py-2.5 text-default-700 whitespace-nowrap">
                    {{ phrase }}
                </span>
            </div>

            <div class="marquee-track gap-3.5 mt-3.5" style="animation-direction: reverse; animation-duration: 54s;">
                <span v-for="(phrase, idx) in [...rowTwo, ...rowTwo]" :key="`b-${idx}`"
                      class="shrink-0 rounded-full border border-primary/15 bg-primary-soft/50 px-5 py-2.5 text-primary-ink whitespace-nowrap">
                    {{ phrase }}
                </span>
            </div>
        </div>

        <div class="container mt-9 text-center" data-reveal="up">
            <p class="text-lg text-default-950 font-medium">All of it is welcome here.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
const rowOne: string[] = [
  'Burnout that nobody noticed',
  "I'm fine, actually",
  '3am thoughts',
  'A breakup I keep explaining away',
  'Guilt about resting',
  'Pressure from home',
  'The thing I haven’t told anyone',
  'Feeling behind everyone else'
]

const rowTwo: string[] = [
  'Grief that arrived late',
  'A job that’s quietly draining me',
  'Loneliness in a full room',
  'Saying yes when I meant no',
  'Not knowing why I’m crying',
  'Carrying everyone else',
  'Starting over at 30',
  'Just needing to say it out loud'
]
</script>
