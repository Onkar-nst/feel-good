<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 bg-cream">
        <div class="container">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Our Certificates
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        The Training Behind the Listening
                    </h2>
                </div>

                <p class="lg:max-w-[42ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Kinjal is a listener, not a therapist. These certifications aren't a licence to
                    treat anyone. They are simply the training that shaped how she holds a conversation.
                </p>
            </div>

            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5" data-reveal-group>
                <button
                    v-for="(credential, idx) in credentialData"
                    :key="idx"
                    type="button"
                    data-reveal="up"
                    :aria-label="`View ${credential.title} in full size`"
                    class="card-lift group relative overflow-hidden rounded-2xl border border-default-200/70 bg-white flex flex-col text-start hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
                    @click="open(idx)"
                >
                    <div class="relative overflow-hidden bg-default-100">
                        <img :src="credential.image" :alt="`${credential.title}, awarded to Kinjal Shah`"
                             loading="lazy"
                             class="h-56 w-full object-cover object-top transition-transform duration-[1.4s] ease-soft group-hover:scale-105">

                        <!-- Zoom affordance, so the card reads as openable -->
                        <span class="absolute inset-0 flex items-center justify-center bg-default-950/25 opacity-0 transition-opacity duration-500 ease-soft group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span class="flex size-11 items-center justify-center rounded-full bg-white/95 text-default-950">
                                <Icon icon="tabler:zoom-in" class="size-5" />
                            </span>
                        </span>
                    </div>

                    <div class="flex flex-1 flex-col gap-3 p-6">
                        <div>
                            <h3 class="mb-1.5 text-lg h-display leading-snug">{{ credential.title }}</h3>
                            <p class="text-sm text-default-600">{{ credential.detail }}</p>
                        </div>

                        <div class="mt-auto pt-3 border-t border-default-200 text-xs text-default-500">
                            {{ credential.issuer }} &middot; {{ credential.year }}
                        </div>
                    </div>
                </button>
            </div>

            <!-- Registration. Shown as text rather than the certificate scan, which
                 carries a personal address and mobile number. -->
            <div class="mt-5 rounded-2xl border border-default-200/70 bg-white p-7 lg:p-9 flex flex-wrap items-center justify-between gap-6"
                 data-reveal="up">
                <div class="flex items-start gap-4">
                    <span class="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                        <Icon icon="tabler:building-bank" class="size-5.5" />
                    </span>

                    <div>
                        <h3 class="mb-1 text-lg h-display">A Registered Indian Business</h3>
                        <p class="text-default-600">
                            The Feel Good Center is registered with the Ministry of Micro, Small and
                            Medium Enterprises, Government of India.
                        </p>
                    </div>
                </div>

                <div class="rounded-xl bg-cream px-5 py-3">
                    <div class="text-xs text-default-500 mb-0.5">Udyam Registration Number</div>
                    <div class="font-medium text-default-950 tabular-nums">UDYAM-MH-18-0458945</div>
                </div>
            </div>
        </div>

        <!-- ── Lightbox ─────────────────────────────────────────────── -->
        <ClientOnly>
            <Teleport to="body">
                <Transition
                    enter-active-class="transition-opacity duration-300 ease-soft"
                    leave-active-class="transition-opacity duration-300 ease-soft"
                    enter-from-class="opacity-0" leave-to-class="opacity-0"
                >
                    <div
                        v-if="activeIndex !== null"
                        class="fixed inset-0 z-[70] flex items-center justify-center bg-default-950/85 p-4 backdrop-blur-sm md:p-8"
                        role="dialog"
                        aria-modal="true"
                        :aria-label="active?.title"
                        @click.self="close"
                    >
                        <!-- Close -->
                        <button
                            ref="closeEl"
                            type="button"
                            aria-label="Close certificate"
                            class="absolute end-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:end-6 md:top-6"
                            @click="close"
                        >
                            <Icon icon="tabler:x" class="size-5" />
                        </button>

                        <!-- Previous / next -->
                        <button
                            type="button"
                            aria-label="Previous certificate"
                            class="absolute start-2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:start-6"
                            @click.stop="step(-1)"
                        >
                            <Icon icon="tabler:chevron-left" class="size-6" />
                        </button>

                        <button
                            type="button"
                            aria-label="Next certificate"
                            class="absolute end-2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:end-6"
                            @click.stop="step(1)"
                        >
                            <Icon icon="tabler:chevron-right" class="size-6" />
                        </button>

                        <figure class="flex max-h-full w-full max-w-4xl flex-col items-center gap-4">
                            <img
                                :src="active?.image"
                                :alt="`${active?.title}, awarded to Kinjal Shah`"
                                class="max-h-[75vh] w-auto max-w-full rounded-xl bg-white object-contain shadow-2xl"
                                @click.stop
                            >

                            <figcaption class="text-center text-white/80">
                                <div class="text-white font-medium">{{ active?.title }}</div>
                                <div class="text-sm">{{ active?.issuer }} &middot; {{ active?.year }}</div>
                            </figcaption>
                        </figure>
                    </div>
                </Transition>
            </Teleport>
        </ClientOnly>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

type CredentialType = {
  image: string
  title: string
  detail: string
  issuer: string
  year: string
}

const credentialData: CredentialType[] = [
  {
    image: '/images/credentials/diploma-integrative-counselling.jpg',
    title: 'Diploma in Integrative Counselling',
    detail: '150 hours of training in counselling skills, theory and practice across three models.',
    issuer: 'Heart to Heart Counselling Centre, India',
    year: '2021'
  },
  {
    image: '/images/credentials/certificate-personal-counselling.jpg',
    title: 'Certificate in Personal Counselling',
    detail: "Training based on Robert Carkhuff's Model of Counselling.",
    issuer: 'Institute of Human Technology',
    year: '2020'
  },
  {
    image: '/images/credentials/certificate-transactional-analysis.jpg',
    title: 'Certificate in Applied Transactional Analysis',
    detail: 'Understanding the patterns underneath how people speak to one another.',
    issuer: 'Institute of Human Technology',
    year: '2020'
  },
  {
    image: '/images/credentials/certificate-rebt.jpg',
    title: 'Certificate in Counselling',
    detail: 'Advanced training in Rational Emotive Behavior Therapy.',
    issuer: 'Institute of Human Technology',
    year: '2021'
  }
]

/* ── Lightbox ────────────────────────────────────────────────────────────
   Opening a certificate locks the page behind it, traps Escape and the
   arrow keys, and hands focus to the close button so keyboard users aren't
   stranded at the top of the document. */

const activeIndex = ref<number | null>(null)
const closeEl = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

const active = computed(() =>
  activeIndex.value === null ? null : credentialData[activeIndex.value]
)

const onKeydown = (event: KeyboardEvent) => {
  if (activeIndex.value === null) return

  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

const open = async (idx: number) => {
  lastFocused = document.activeElement as HTMLElement | null
  activeIndex.value = idx

  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)

  await nextTick()
  closeEl.value?.focus()
}

const close = () => {
  activeIndex.value = null

  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)

  lastFocused?.focus()
  lastFocused = null
}

/* Wraps around, so the arrows never dead-end. */
const step = (delta: number) => {
  if (activeIndex.value === null) return
  const count = credentialData.length
  activeIndex.value = (activeIndex.value + delta + count) % count
}

/* Navigating away mid-view would otherwise leave the page unscrollable. */
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>
