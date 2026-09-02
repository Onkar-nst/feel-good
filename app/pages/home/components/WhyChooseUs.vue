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

            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5" data-reveal-group>
                <div
                    v-for="(item, idx) in reasonData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden border border-default-200 rounded-2xl p-7 flex flex-col gap-12 bg-white hover:border-primary/30"
                >
                    <!-- Warm field that rises on hover -->
                    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-linear-to-t from-primary-soft to-transparent transition-all duration-700 ease-soft group-hover:h-full"></div>

                    <div class="relative flex items-center gap-3">
                        <span class="font-heading text-2xl text-pink">{{ item.number }}</span>
                        <span class="h-px flex-1 origin-left scale-x-100 bg-default-200 transition-colors duration-500 group-hover:bg-primary/30"></span>
                    </div>

                    <p class="relative text-xl text-default-950 leading-snug" v-html="item.text"></p>
                </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden group mt-5" data-reveal="scale">
                <NuxtLink to="/contact" class="absolute inset-0 z-10" aria-label="Book a listening session"></NuxtLink>

                <img src="/images/other/case-study.webp" alt="A calm space to talk"
                     class="rounded-2xl object-cover w-full transition-transform duration-[1.4s] ease-soft group-hover:scale-105">

                <div class="absolute inset-0 bg-linear-to-t from-default-950/45 via-transparent to-transparent"></div>

                <div class="md:absolute bottom-7 inset-x-7 flex items-center justify-between gap-5 rounded-xl bg-white/95 backdrop-blur-sm p-5">
                    <div class="space-y-2">
                        <div class="eyebrow">
                            Fully, Truly, Kindly.
                        </div>
                        <h2 class="h-display md:text-2xl text-xl">Let's talk. I'm here to listen.</h2>
                    </div>

                    <span class="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-ink transition-transform duration-500 ease-soft group-hover:scale-110 group-hover:rotate-45">
                        <Icon icon="tabler:arrow-up-right" class="size-5" />
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
  text: string
}

const reasonData: ReasonType[] = [
  { number: '01.', text: 'No advice, no fixing. Just pure listening.' },
  { number: '02.', text: 'Warm, not clinical, and deeply human.' },
  { number: '03.', text: 'Led by lived experience, not just theory.' },
  { number: '04.', text: 'A space people return to simply because it <em class="italic text-pink">feels good</em>.' }
]
</script>
