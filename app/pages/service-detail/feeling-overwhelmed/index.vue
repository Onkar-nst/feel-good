<template>
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="pt-10 md:pt-14 lg:pt-16 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[34rem] -top-44 -start-40 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-[26rem] top-1/4 -end-32 bg-pastel-soft/70"></div>
        </div>

        <div class="container relative">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-10 items-center">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">If you are carrying too much</div>

                    <h1 class="h-display lg:text-[52px] md:text-5xl text-[34px] leading-[1.1] mb-5" data-reveal="up">
                        Feeling overwhelmed and need someone to talk to?
                    </h1>

                    <p class="text-lg text-default-600 mb-4" data-reveal="up" style="--reveal-delay:120ms">
                        Everything at once, and no room to put any of it down. You are not being
                        dramatic, and you do not need a reason big enough to justify it.
                    </p>

                    <p class="text-lg text-default-800 mb-9" data-reveal="up" style="--reveal-delay:200ms">
                        Book a private listening session and say it out loud to someone whose only
                        job is to hear you.
                    </p>

                    <div class="flex flex-wrap items-center gap-4" data-reveal="up" style="--reveal-delay:280ms">
                        <NuxtLink to="/contact" class="btn-primary btn-fill btn-lg group">
                            <span>Book a Session</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                        </NuxtLink>

                        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="btn-outline btn-lg group">
                            <Icon icon="tabler:brand-whatsapp" class="size-5" />
                            <span>Message us instead</span>
                        </a>
                    </div>

                    <p class="mt-6 text-sm text-default-500" data-reveal="up" style="--reveal-delay:360ms">
                        Confidential &middot; No judgment &middot; No obligation to continue
                    </p>
                </div>

                <div class="relative" data-reveal="scale">
                    <!-- Native 5:4, so the room and the light survive rather than being
                         cropped away by a portrait frame. -->
                    <div class="group relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl aspect-[5/4]">
                        <img src="/images/other/about-image.jpg"
                             alt="Someone sitting quietly at home during an online listening session"
                             class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Recognition ──────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden bg-cream">
        <div class="container">
            <div class="lg:mb-12 mb-9 mx-auto lg:max-w-[54ch] text-center">
                <div class="eyebrow mb-5" data-reveal="soft">Does this sound familiar</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl mb-4" data-reveal="up">
                    Overwhelmed rarely looks like falling apart
                </h2>
                <p class="text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Most people who book a session are functioning perfectly well on the outside.
                    That is exactly the problem.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal-group>
                <div v-for="(sign, idx) in signData" :key="idx"
                     data-reveal="up"
                     class="card-lift rounded-2xl border border-default-200 bg-white p-6 flex items-start gap-3.5">
                    <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-pink-soft text-pink">
                        <Icon icon="tabler:check" class="size-3.5" />
                    </span>
                    <p class="text-default-700">{{ sign }}</p>
                </div>
            </div>

            <p class="mt-9 text-center text-lg text-default-950 font-medium" data-reveal="up">
                If you recognised yourself more than once, that is reason enough to talk.
            </p>
        </div>
    </section>

    <!-- ── What this is, and what it is not ─────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 ">
        <div class="container">
            <!-- Side-by-side rather than a narrow centred column: the heading and the
                 safety note hold the left rail so the section fills its width. -->
            <div class="grid lg:grid-cols-12 lg:gap-12 gap-9 items-start">

                <div class="lg:col-span-4 lg:sticky lg:top-28">
                    <div class="eyebrow mb-5" data-reveal="soft">Before you book</div>

                    <h2 class="h-display lg:text-4xl md:text-3xl text-2xl mb-4" data-reveal="up">
                        Being clear about what this is
                    </h2>

                    <p class="text-default-600 lg:max-w-[38ch]" data-reveal="up" style="--reveal-delay:120ms">
                        No surprises, no small print. Here is exactly what a session
                        does and does not include.
                    </p>

                    <div class="mt-7 rounded-2xl border border-default-200 bg-cream p-5" data-reveal="up" style="--reveal-delay:220ms">
                        <div class="mb-2 flex items-center gap-2 text-default-950">
                            <Icon icon="tabler:lifebuoy" class="size-4.5 text-pink" />
                            <span class="text-sm font-medium">If you need more than listening</span>
                        </div>
                        <p class="text-sm text-default-600">
                            Listening helps, but it is not treatment. If you are in immediate distress,
                            please call Tele MANAS on
                            <a href="tel:14416" class="font-medium text-default-950 underline decoration-pink underline-offset-2">14416</a>.
                            It is free and open 24 hours a day.
                        </p>
                    </div>
                </div>

                <div class="lg:col-span-8 grid sm:grid-cols-2 gap-5">
                    <div class="relative overflow-hidden rounded-3xl border border-accent/25 bg-accent-soft p-7 lg:p-8" data-reveal="up">
                        <h3 class="h-display text-xl mb-5 flex items-center gap-2.5">
                            <Icon icon="tabler:circle-check" class="size-5 text-accent" />
                            What it is
                        </h3>
                        <ul role="list" class="space-y-3.5">
                            <li v-for="(item, idx) in isData" :key="idx" class="flex items-start gap-3">
                                <Icon icon="tabler:check" class="mt-1 size-4 shrink-0 text-accent" />
                                <span class="text-default-700">{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="relative overflow-hidden rounded-3xl border border-default-200 bg-cream p-7 lg:p-8" data-reveal="up" style="--reveal-delay:120ms">
                        <h3 class="h-display text-xl mb-5 flex items-center gap-2.5">
                            <Icon icon="tabler:circle-x" class="size-5 text-default-400" />
                            What it is not
                        </h3>
                        <ul role="list" class="space-y-3.5">
                            <li v-for="(item, idx) in isNotData" :key="idx" class="flex items-start gap-3">
                                <Icon icon="tabler:x" class="mt-1 size-4 shrink-0 text-default-400" />
                                <span class="text-default-600">{{ item }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── How a session goes ───────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-periwinkle grain lg:p-14 md:p-10 p-7" data-reveal="scale">
                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-96 -top-28 -start-20 bg-white/45"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-24 start-1/3 bg-primary-soft/60"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-periwinkle-ink/70!">How a session goes</div>
                    <h2 class="h-display text-periwinkle-ink lg:text-4xl md:text-3xl text-2xl mb-9 lg:max-w-[22ch]">
                        Fifty minutes that belong entirely to you
                    </h2>

                    <ol class="grid md:grid-cols-3 gap-7" data-reveal-group>
                        <li v-for="(step, idx) in stepData" :key="idx" data-reveal="up">
                            <span class="mb-4 flex size-9 items-center justify-center rounded-full bg-white/75 font-heading text-periwinkle-ink">
                                {{ idx + 1 }}
                            </span>
                            <h3 class="h-display text-periwinkle-ink! text-lg mb-2">{{ step.title }}</h3>
                            <p class="text-sm text-periwinkle-ink/80">{{ step.body }}</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Proof ────────────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 bg-cream">
        <div class="container lg:max-w-3xl! text-center">
            <div class="eyebrow mb-6" data-reveal="soft">From someone who booked</div>

            <blockquote class="h-display lg:text-3xl md:text-2xl text-xl leading-snug text-default-950 mb-7" data-reveal="up">
                &ldquo;Whenever I am stressed or anxious, a single conversation with Kinjal works like
                magic. She has this natural ability to calm someone down, clear their head, and make
                everything feel lighter.&rdquo;
            </blockquote>

            <div class="flex items-center justify-center gap-3" data-reveal="up">
                <span class="flex size-10 items-center justify-center rounded-full bg-primary-soft font-heading text-primary-ink">JS</span>
                <div class="text-start">
                    <div class="font-medium text-default-950">Jash Shah</div>
                    <div class="text-sm text-default-500">Verified session</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-10 md:pb-14 lg:pb-16 ">
        <div class="container lg:max-w-3xl!">
            <div class="lg:mb-10 mb-8 text-center">
                <div class="eyebrow mb-5" data-reveal="soft">Common questions</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl" data-reveal="up">
                    The things people ask first
                </h2>
            </div>

            <div class="border-t border-default-200" data-reveal="up">
                <div v-for="(item, idx) in faqData" :key="idx" class="border-b border-default-200">
                    <h3>
                        <button type="button"
                                :aria-expanded="openIndex === idx"
                                :aria-controls="`fo-faq-${idx}`"
                                class="group flex w-full items-start justify-between gap-5 py-5 text-start text-default-950 transition-colors duration-300 hover:text-default-600"
                                @click="toggle(idx)">
                            <span class="text-lg font-medium">{{ item.q }}</span>
                            <span class="relative mt-1.5 flex size-4 shrink-0 items-center justify-center transition-colors duration-300 group-hover:text-pink"
                                  :class="openIndex === idx ? 'text-pink' : 'text-default-400'"
                                  aria-hidden="true">
                                <span class="absolute h-px w-4 bg-current"></span>
                                <span class="absolute h-px w-4 bg-current transition-transform duration-500 ease-soft"
                                      :class="openIndex === idx ? 'rotate-0' : 'rotate-90'"></span>
                            </span>
                        </button>
                    </h3>

                    <div :id="`fo-faq-${idx}`"
                         class="grid transition-all duration-500 ease-soft"
                         :class="openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                        <div class="overflow-hidden">
                            <p class="pb-6 pe-8 text-default-600">{{ item.a }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <CtaSection />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'
import { useHead } from '#unhead/composables'
import { usePageTitle } from '~/composables/usePageTitle'
import CtaSection from '~/components/CtaSection.vue'

/*
 * Prototype for the per problem landing pages in CLIENT-NOTES section 5.
 * Content is kept in these flat arrays deliberately: once the design is signed
 * off, this file becomes the first entry in a content model behind one dynamic
 * route, rather than eight hand built pages.
 */

const signData: string[] = [
  'Your to do list grows faster than you can clear it.',
  'You are tired in a way that sleeping does not fix.',
  'Small things set you off more than they used to.',
  'You keep saying you are fine because it is quicker.',
  'Your mind is loudest at night, when nobody is awake.',
  'You have been meaning to deal with it for months.'
]

const isData: string[] = [
  'Fifty minutes of undivided attention, on video or voice.',
  'A space to think out loud without being interrupted.',
  'Complete confidentiality. Nothing recorded, nothing shared.',
  'Somewhere to start, with no commitment to continue.'
]

const isNotData: string[] = [
  'Therapy, counselling or a clinical diagnosis.',
  'Coaching, or a plan you have to follow afterwards.',
  'Advice you did not ask for.',
  'Emergency or crisis care.'
]

const stepData = [
  { title: 'You reach out', body: 'A sentence is enough. You do not have to explain everything up front.' },
  { title: 'We find a time', body: 'Kinjal replies personally, usually within a few hours, and you pick a slot.' },
  { title: 'You talk, we listen', body: 'Camera on or off. Say as much or as little as you want to.' }
]

const faqData = [
  {
    q: 'I am not in crisis. Is it still alright to book?',
    a: 'Yes, and most people who book are not. You do not have to be in crisis to deserve to be heard. Everyday weight counts.'
  },
  {
    q: 'What if I cannot explain what is wrong?',
    a: 'That is a completely normal place to start. Plenty of people begin by saying they do not know where to begin.'
  },
  {
    q: 'Is this confidential?',
    a: 'Completely. Nothing you share leaves the session. Nothing is recorded, nothing is written down, and nothing is repeated to anyone.'
  },
  {
    q: 'What does it cost?',
    a: 'Sessions start at ₹1,799 for 50 minutes. Weekly and monthly plans bring the cost per session down.'
  }
]

// First question starts open, so the column reads as answers rather than
// a list of closed headings.
const openIndex = ref<number | null>(0)
const toggle = (idx: number) => { openIndex.value = openIndex.value === idx ? null : idx }

const whatsappLink =
  'https://wa.me/919004989199?text=' +
  encodeURIComponent("Hi! I've been feeling overwhelmed and would like to know more about a listening session.")

usePageTitle('Feeling Overwhelmed')

useHead({
  meta: [
    {
      name: 'description',
      content: 'Feeling overwhelmed and need someone to talk to? Book a private, confidential listening session with The Feel Good Center. No therapy, no advice, just fifty minutes of being properly heard.'
    }
  ]
})
</script>
