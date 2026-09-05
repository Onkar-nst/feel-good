<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8">
        <div class="container">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Why Choose Us
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        What Makes Us Different?
                    </h2>
                </div>

                <p class="lg:max-w-[38ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Four things that shape every session, and that most places in this space don't offer.
                </p>
            </div>

            <!-- A numbered manifesto rather than four cards. Hairline rules instead of
                 borders, so the four points read as one statement and the section stops
                 repeating the card grid used above and below it. -->
            <ol class="border-t border-default-200" data-reveal-group>
                <li
                    v-for="(item, idx) in reasonData"
                    :key="idx"
                    data-reveal="up"
                    class="group relative border-b border-default-200"
                >
                    <!-- Rule that draws itself across the row on hover -->
                    <span class="pointer-events-none absolute bottom-0 start-0 h-px w-full origin-left scale-x-0 bg-pink transition-transform duration-700 ease-soft group-hover:scale-x-100"></span>

                    <div class="grid md:grid-cols-12 items-baseline gap-x-8 gap-y-2 py-7 lg:py-9 transition-transform duration-500 ease-soft md:group-hover:translate-x-2">
                        <span class="md:col-span-2 font-heading lg:text-5xl text-4xl text-default-950/15 transition-colors duration-500 group-hover:text-pink">
                            {{ item.number }}
                        </span>

                        <div class="md:col-span-10">
                            <p class="h-display lg:text-[32px] text-2xl leading-snug" v-html="item.title"></p>
                            <p class="mt-2.5 text-default-600 lg:max-w-[52ch]">{{ item.body }}</p>
                        </div>
                    </div>
                </li>
            </ol>

            <!-- Copy sits straight on the photograph now, instead of in a white panel
                 floating inside a rounded box inside the section. -->
            <div class="group relative mt-12 lg:mt-16 overflow-hidden rounded-3xl" data-reveal="scale">
                <NuxtLink to="/contact" class="absolute inset-0 z-10" aria-label="Book a listening session"></NuxtLink>

                <img src="/images/other/case-study.webp" alt="A calm space to talk"
                     class="w-full lg:h-[26rem] md:h-80 h-64 object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">

                <div class="absolute inset-0 bg-linear-to-t from-default-950/80 via-default-950/25 to-transparent"></div>

                <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 lg:p-10 p-7">
                    <div>
                        <div class="eyebrow text-white/75!">Fully, Truly, Kindly.</div>
                        <h3 class="h-display text-white! lg:text-3xl text-2xl mt-2.5">Let's talk. I'm here to listen.</h3>
                    </div>

                    <span class="hidden sm:flex size-13 shrink-0 items-center justify-center rounded-full bg-primary text-primary-ink transition-transform duration-500 ease-soft group-hover:scale-110 group-hover:rotate-45">
                        <Icon icon="tabler:arrow-up-right" class="size-5.5" />
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type ReasonType = {
  number: string
  title: string
  body: string
}

const reasonData: ReasonType[] = [
  {
    number: '01.',
    title: 'A space that\'s <em class="italic text-pink">yours</em>',
    body: 'Come exactly as you are, with whatever is on your mind'
  },
  {
    number: '02.',
    title: 'Talk without having to hold it all together',
    body: 'Say the things you may not know how to say anywhere else'
  },
  {
    number: '03.',
    title: 'No agenda. No expectations. Just your space to be heard',
    body: 'This conversation is about you, at your pace, in your own words'
  },
  {
    number: '04.',
    title: 'Because sometimes, putting it down is enough',
    body: 'You don\'t need to solve everything today. Sometimes, you just need somewhere to put it'
  }
]
</script>
