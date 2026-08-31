<template>
    <section class="pt-8 pb-10 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16">
        <div class="container max-w-315!">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-14 items-start">

                <!-- ── Review form ──────────────────────────────────── -->
                <div class="border border-default-200 rounded-2xl lg:p-10 p-6 lg:sticky lg:top-28 lg:self-start" data-reveal="up">
                    <h2 class="h-display mb-8 lg:text-4xl md:text-3xl text-2xl">Your review</h2>

                    <form @submit.prevent>
                        <div class="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="review-rating" class="mb-1.5 text-sm block">Your overall rating</label>
                                <select id="review-rating" name="review-rating" class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                                    <option value="">Select a Rating</option>
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>

                            <div>
                                <label for="review-title" class="mb-1.5 text-sm block">Title of your review</label>
                                <input type="text" id="review-title" class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>
                        </div>

                        <div class="mb-6">
                            <label for="review-body" class="mb-1.5 text-sm block">Your review</label>
                            <textarea id="review-body" rows="6" class="rounded-lg bg-default-100 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200"></textarea>
                        </div>

                        <div class="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="review-name" class="mb-1.5 text-sm block">Your name</label>
                                <input type="text" id="review-name" class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="review-email" class="mb-1.5 text-sm block">Your email</label>
                                <input type="email" id="review-email" class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>
                        </div>

                        <div class="mb-8 flex items-start gap-3">
                            <input type="checkbox" id="review-consent" class="mt-1 size-4.5 rounded border-default-300 text-pink focus:ring-0">
                            <label for="review-consent" class="text-sm text-default-600">This review is based on my own experience and is my genuine opinion.</label>
                        </div>

                        <button type="submit" class="btn-primary btn-fill btn-lg group">
                            <span>Submit Review</span>
                        </button>
                    </form>
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
import { ref } from 'vue'

type FaqType = { q: string, a: string }

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
