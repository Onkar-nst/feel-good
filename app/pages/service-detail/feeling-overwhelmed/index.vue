<template>
    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <section class="pt-10 md:pt-14 lg:pt-16 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[34rem] -top-44 -start-40 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-[26rem] top-1/4 -end-32 bg-lagoon-soft/70"></div>
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
                        <CalendlyButton :url="EVENT_TYPES.listening50">Book a Session</CalendlyButton>

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
    <section class="pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24 relative overflow-hidden bg-cream">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[30rem] -bottom-52 -end-40 bg-primary-soft/45"></div>
        </div>

        <div class="container">
            <div class="mx-auto lg:max-w-[52ch] text-center lg:mb-20 mb-14">
                <div class="eyebrow mb-6" data-reveal="soft">Does this sound familiar</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl leading-[1.2] mb-5" data-reveal="up">
                    Overwhelmed rarely looks like falling apart
                </h2>
                <p class="text-lg text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Most people who book a session are functioning perfectly well on the outside.
                    That is exactly the problem.
                </p>
            </div>

            <!-- Unboxed on purpose: six bordered cards read as a checklist to get
                 through. Hairlines and wide gutters let each line be read alone. -->
            <div class="mx-auto lg:max-w-5xl grid md:grid-cols-2 lg:gap-x-16 md:gap-x-10" data-reveal-group>
                <p v-for="(sign, idx) in signData" :key="idx"
                   data-reveal="up"
                   class="flex items-start gap-4 py-6 md:py-7 border-b border-default-200/70 text-lg leading-relaxed text-default-700">
                    <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-pink" aria-hidden="true"></span>
                    <span>{{ sign }}</span>
                </p>
            </div>

            <p class="mt-14 md:mt-16 text-center text-lg md:text-xl text-default-950 font-medium mx-auto lg:max-w-[40ch]" data-reveal="up">
                If you recognised yourself more than once, that is reason enough to talk.
            </p>
        </div>
    </section>

    <!-- ── What this is, and what it is not ─────────────────────── -->
    <section class="pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24">
        <div class="container">
            <div class="mx-auto lg:max-w-[52ch] text-center lg:mb-20 mb-14">
                <div class="eyebrow mb-6" data-reveal="soft">Before you book</div>
                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl leading-[1.2] mb-5" data-reveal="up">
                    Being clear about what this is
                </h2>
                <p class="text-lg text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    No surprises, no small print. Here is exactly what a session
                    does and does not include.
                </p>
            </div>

            <div class="mx-auto lg:max-w-5xl grid md:grid-cols-2 lg:gap-14 gap-10 md:gap-12">
                <div data-reveal="up">
                    <h3 class="h-display text-xl flex items-center gap-3 pb-6 mb-2 border-b border-lagoon/30">
                        <span class="flex size-9 items-center justify-center rounded-full bg-lagoon-soft">
                            <Icon icon="tabler:check" class="size-4.5 text-lagoon-ink" />
                        </span>
                        What it is
                    </h3>
                    <ul role="list">
                        <li v-for="(item, idx) in isData" :key="idx"
                            class="py-6 border-b border-default-200/70 text-lg leading-relaxed text-default-700">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div data-reveal="up" style="--reveal-delay:140ms">
                    <h3 class="h-display text-xl flex items-center gap-3 pb-6 mb-2 border-b border-default-200">
                        <span class="flex size-9 items-center justify-center rounded-full bg-cream-deep">
                            <Icon icon="tabler:minus" class="size-4.5 text-default-500" />
                        </span>
                        What it is not
                    </h3>
                    <ul role="list">
                        <li v-for="(item, idx) in isNotData" :key="idx"
                            class="py-6 border-b border-default-200/70 text-lg leading-relaxed text-default-500">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- The safety note sits apart from the comparison so it reads as care,
                 not as another bullet to weigh up. -->
            <div class="mx-auto lg:max-w-3xl mt-14 md:mt-20 rounded-3xl bg-cream px-7 py-8 md:px-10 md:py-9 text-center"
                 data-reveal="up">
                <div class="mb-3 flex items-center justify-center gap-2 text-default-950">
                    <Icon icon="tabler:lifebuoy" class="size-5 text-pink" />
                    <span class="font-medium">If you need more than listening</span>
                </div>
                <p class="text-default-600 leading-relaxed mx-auto max-w-[52ch]">
                    Listening helps, but it is not treatment. If you are in immediate distress,
                    please call Tele MANAS on
                    <a href="tel:14416" class="font-medium text-default-950 underline decoration-pink underline-offset-4">14416</a>.
                    It is free and open 24 hours a day.
                </p>
            </div>
        </div>
    </section>

    <!-- ── How a session goes ───────────────────────────────────── -->
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative overflow-hidden">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-lagoon grain lg:p-14 md:p-10 p-7" data-reveal="scale">
                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-96 -top-28 -start-20 bg-white/45"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-24 start-1/3 bg-primary-soft/60"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-lagoon-ink/70!">How a session goes</div>
                    <h2 class="h-display text-lagoon-ink lg:text-4xl md:text-3xl text-2xl mb-9 lg:max-w-[22ch]">
                        Fifty minutes that belong entirely to you
                    </h2>

                    <ol class="grid md:grid-cols-2 lg:grid-cols-4 gap-7" data-reveal-group>
                        <li v-for="(step, idx) in stepData" :key="idx" data-reveal="up">
                            <span class="mb-4 flex size-9 items-center justify-center rounded-full bg-white/75 font-heading text-lagoon-ink">
                                {{ idx + 1 }}
                            </span>
                            <h3 class="h-display text-lagoon-ink! text-lg mb-2">{{ step.title }}</h3>
                            <p class="text-sm text-lagoon-ink/80">{{ step.body }}</p>
                        </li>
                    </ol>

                    <!-- The calendar the second step promises, opened in place -->
                    <div class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal="up">
                        <CalendlyButton :url="EVENT_TYPES.listening50" button-class="btn-light btn-lg group">
                            Book a slot on Calendly
                        </CalendlyButton>

                        <p class="text-sm text-lagoon-ink/75">
                            Real availability, confirmed straight away.
                        </p>
                    </div>
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
                <img src="/images/reviews/jash-shah.jpg" alt="Jash Shah" loading="lazy"
                     class="size-10 shrink-0 rounded-full object-cover object-top">
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
            <div class="lg:mb-10 mb-8 text-start md:text-center">
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
import CalendlyButton from '~/components/CalendlyButton.vue'
import { EVENT_TYPES } from '~/utils/calendly'
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
  { title: 'Choose what you need', body: 'Pick the kind of support that fits, whether it is a one off conversation or something ongoing.' },
  { title: 'Book a slot on Calendly', body: 'Open the calendar, pick a time that suits you, and it is confirmed straight away.' },
  { title: 'We meet and you talk', body: 'Fifty minutes, camera on or off. Say as much or as little as you want to.' },
  { title: 'You leave lighter', body: 'Most people finish the call with a clearer head and the weight sitting a little easier.' }
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
    a: 'You can start with a ₹799 session of 30 minutes, which is the easiest way to try this out and see how it feels. If you would like more room to talk, a full 50 minute session is ₹1,799. Weekly and monthly plans bring the cost per session down further.'
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
      content: 'Feeling overwhelmed and need someone to talk to? Book a private, confidential listening session with The Feel Good Centre. No therapy, no advice, just fifty minutes of being properly heard.'
    }
  ]
})
</script>
