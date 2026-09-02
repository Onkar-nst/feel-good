<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container max-w-315!">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-14 items-start">

                <!-- ── Review form ──────────────────────────────────── -->
                <div class="relative overflow-hidden rounded-3xl border border-default-200/70 bg-linear-to-br from-cream via-white to-pastel-soft/70 lg:p-10 p-6 lg:sticky lg:top-28 lg:self-start shadow-[0_24px_60px_-40px_rgb(28_22_20/0.35)]" data-reveal="up">

                    <div class="aura animate-breathe size-64 -top-28 -end-20 bg-pastel/35" aria-hidden="true"></div>

                    <div class="relative">
                        <div class="eyebrow mb-4">Share Your Experience</div>

                        <h2 class="h-display mb-2.5 lg:text-4xl md:text-3xl text-2xl">Your review</h2>

                        <p class="text-default-600 mb-8">
                            If a session helped, saying so helps the next person decide to book.
                        </p>

                        <form @submit.prevent>
                            <!-- Rating — stars you actually click, not a dropdown -->
                            <div class="mb-6">
                                <span class="field-label">Your overall rating</span>

                                <div class="flex flex-wrap items-center gap-x-4 gap-y-2" @mouseleave="hoverRating = 0">
                                    <div class="flex items-center gap-1.5">
                                        <button
                                            v-for="n in 5" :key="n"
                                            type="button"
                                            :aria-label="`${n} star${n > 1 ? 's' : ''}`"
                                            :aria-pressed="rating === n"
                                            class="rounded-full transition-transform duration-300 ease-soft hover:scale-115 focus-visible:ring-4 focus-visible:ring-pink/25"
                                            @click="rating = n"
                                            @mouseenter="hoverRating = n"
                                        >
                                            <Icon
                                                icon="tabler:star-filled"
                                                :class="[
                                                    'size-7 transition-colors duration-300',
                                                    (hoverRating || rating) >= n ? 'text-pink' : 'text-default-200'
                                                ]"
                                            />
                                        </button>
                                    </div>

                                    <span class="text-sm text-default-500 transition-opacity duration-300"
                                          :class="ratingLabel ? 'opacity-100' : 'opacity-0'">
                                        {{ ratingLabel || '\u00a0' }}
                                    </span>
                                </div>

                                <input type="hidden" name="rating" :value="rating">
                            </div>

                            <div class="mb-6">
                                <label for="review-title" class="field-label">Title of your review</label>
                                <input type="text" id="review-title" class="field"
                                       placeholder="Sum it up in a few words">
                            </div>

                            <div class="mb-6">
                                <label for="review-body" class="field-label">Your review</label>
                                <textarea id="review-body" rows="6" class="field resize-y"
                                          placeholder="What was the session like? Take your time."></textarea>
                            </div>

                            <div class="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
                                <div>
                                    <label for="review-name" class="field-label">Your name</label>
                                    <input type="text" id="review-name" class="field"
                                           placeholder="First name is enough">
                                </div>

                                <div>
                                    <label for="review-email" class="field-label">Your email</label>
                                    <input type="email" id="review-email" class="field"
                                           placeholder="you@example.com">
                                </div>
                            </div>

                            <label for="review-consent" class="mb-8 flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" id="review-consent" class="peer sr-only">
                                <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-default-300 bg-white transition-all duration-300 ease-soft peer-checked:border-pink peer-checked:bg-pink peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-pink/25">
                                    <Icon icon="tabler:check" class="size-3.5 text-white opacity-0 transition-opacity duration-200" />
                                </span>
                                <span class="text-sm text-default-600">
                                    This review is based on my own experience and is my genuine opinion.
                                </span>
                            </label>

                            <div class="flex justify-center">
                                <button type="submit" class="btn-primary btn-fill btn-lg group w-full sm:w-auto">
                                    <span>Submit Review</span>
                                    <Icon icon="tabler:arrow-right"
                                          class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- ── FAQ ──────────────────────────────────────────── -->
                <div data-reveal="up" style="--reveal-delay:140ms">
                    <div class="eyebrow mb-5">
                        Before You Book
                    </div>

                    <h2 class="h-display lg:text-4xl md:text-3xl text-2xl mb-4">Questions people ask first</h2>

                    <p class="text-default-600 mb-9">
                        The things most people wonder about but feel awkward asking. If yours isn't here,
                        just ask us. No question is too small.
                    </p>

                    <div class="border-t border-default-200">
                        <div v-for="(item, idx) in faqData" :key="idx" class="border-b border-default-200">
                            <h3>
                                <button
                                    type="button"
                                    :aria-expanded="openIndex === idx"
                                    :aria-controls="`faq-panel-${idx}`"
                                    class="group flex w-full items-start justify-between gap-5 py-5 text-start text-default-950 transition-colors duration-300 hover:text-default-600"
                                    @click="toggle(idx)"
                                >
                                    <span class="text-lg font-medium">{{ item.q }}</span>

                                    <!-- Plus that becomes a minus. Drawn in CSS so the list stays iconless. -->
                                    <span
                                        class="relative mt-1.5 flex size-4 shrink-0 items-center justify-center transition-colors duration-300 group-hover:text-pink"
                                        :class="openIndex === idx ? 'text-pink' : 'text-default-400'"
                                        aria-hidden="true"
                                    >
                                        <span class="absolute h-px w-4 bg-current"></span>
                                        <span
                                            class="absolute h-px w-4 bg-current transition-transform duration-500 ease-soft"
                                            :class="openIndex === idx ? 'rotate-0' : 'rotate-90'"
                                        ></span>
                                    </span>
                                </button>
                            </h3>

                            <!-- 0fr to 1fr animates the panel to its natural height -->
                            <div
                                :id="`faq-panel-${idx}`"
                                class="grid transition-all duration-500 ease-soft"
                                :class="openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                            >
                                <div class="overflow-hidden">
                                    <p class="pb-6 pe-8 text-default-600">{{ item.a }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

type FaqType = { q: string, a: string }

// Star rating. hoverRating previews on the way past; rating is what sticks.
const rating = ref(0)
const hoverRating = ref(0)

const RATING_LABELS = ['', 'Not for me', 'It was okay', 'Good', 'Really good', 'Loved it']
const ratingLabel = computed(() => RATING_LABELS[hoverRating.value || rating.value])

// Every question starts closed. The list opens only on intent.
const openIndex = ref<number | null>(null)

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx
}

const faqData: FaqType[] = [
  {
    q: 'Is anything I say confidential?',
    a: "Completely. Nothing you share leaves the session. Nothing is recorded, nothing is written down, and nothing is repeated to anyone."
  },
  {
    q: 'Can I stay anonymous?',
    a: "Yes. A first name is enough, and it doesn't have to be your real one. You're welcome to keep your camera off for the whole session."
  },
  {
    q: 'Where does the session happen?',
    a: "Wherever you're most comfortable. Most sessions are a video or voice call, and plenty of people choose voice only. You get the link once your session is confirmed."
  },
  {
    q: "You're not a therapist. So what is this?",
    a: "Exactly that, and it matters. Kinjal is a listener, not a therapist or a coach. No diagnosis, no advice, no homework. Just someone fully present while you say what you need to say."
  },
  {
    q: 'What actually happens in a session?',
    a: "You talk. We listen. There's no script and no agenda. Some people arrive knowing exactly what they want to say. Others start by admitting they don't know where to start, which is a perfectly good place to start."
  },
  {
    q: 'What if I go quiet, or cry, or say nothing at all?',
    a: "All of it is welcome. Silence isn't awkward here. You set the pace, and nobody will rush you."
  },
  {
    q: 'How is this different from talking to a friend?',
    a: "A friend has opinions about your life and a stake in it. Here, nobody is waiting for their turn to speak, nobody brings it up later, and nothing you say changes how you're seen."
  },
  {
    q: 'What does a session cost?',
    a: "Sessions start at ₹1,799 for 50 minutes. Weekly and monthly plans bring the cost per session down, and there's a shorter catch up session for returning clients."
  },
  {
    q: 'What if I need more support than this?',
    a: "Then we'll tell you honestly. Listening helps, but it isn't treatment. If you're in immediate distress, please call Tele MANAS on 14416. It's free and open 24 hours a day."
  }
]
</script>
