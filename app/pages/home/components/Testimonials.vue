<template>
    <section class="relative pt-8 pb-10 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16 bg-body-bg overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-1 size-[30rem] top-10 -end-40 bg-accent-soft/60"></div>
        </div>

        <div class="container relative">

            <div class="lg:mb-14 mb-10 text-center">
                <div class="eyebrow mb-5" data-reveal="soft">
                    Hear From Others
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    What Our Clients Say
                </h2>

                <p class="text-default-600 lg:max-w-[58ch] mx-auto" data-reveal="up" style="--reveal-delay:120ms">
                    Discover how our listening services have impacted the lives of others seeking support and understanding.
                </p>

                <div class="mt-6 inline-flex items-center gap-2.5 rounded-full border border-default-200 bg-cream px-4 py-2"
                     data-reveal="up" style="--reveal-delay:200ms">
                    <span class="flex gap-0.5">
                        <Icon v-for="n in 5" :key="n" icon="tabler:star-filled" class="size-4 text-pink" />
                    </span>
                    <span class="text-sm text-default-700">
                        <strong class="text-default-950 font-medium">5.0</strong> from {{ reviewData.length }} client reviews
                    </span>
                </div>
            </div>

            <div class="columns-1 md:columns-2 lg:columns-3 gap-5" data-reveal-group>
                <div
                    v-for="(review, idx) in reviewData"
                    :key="idx"
                    data-reveal="up"
                    :class="[
                        'card-lift group relative overflow-hidden break-inside-avoid mb-5 rounded-2xl p-7 flex flex-col gap-5',
                        review.featured
                            ? 'bg-default-950 grain'
                            : 'bg-cream border border-default-200'
                    ]"
                >
                    <Icon icon="tabler:quote"
                          :class="[
                              'absolute -top-1 end-4 size-14 rotate-180 transition-transform duration-700 ease-soft group-hover:scale-110',
                              review.featured ? 'text-white/10' : 'text-pink/10'
                          ]" />

                    <div class="relative flex gap-0.5">
                        <Icon v-for="n in 5" :key="n" icon="tabler:star-filled"
                              :class="['size-4', review.featured ? 'text-white/80' : 'text-pink']" />
                    </div>

                    <div class="relative">
                        <h3 :class="['mb-1.5 text-xl h-display', review.featured ? 'text-white' : 'text-default-950']">
                            {{ review.title }}
                        </h3>
                        <div :class="['text-sm', review.featured ? 'text-white/50' : 'text-default-500']">
                            {{ review.date }}
                        </div>
                    </div>

                    <p :class="['relative', review.featured ? 'text-white/85' : 'text-default-600']">
                        {{ review.content }}
                    </p>

                    <div :class="[
                        'relative mt-auto flex items-center gap-3 pt-4 border-t',
                        review.featured ? 'border-white/12' : 'border-default-200'
                    ]">
                        <span :class="[
                            'flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-base',
                            review.featured ? 'bg-white/12 text-white' : 'bg-primary-soft text-pink'
                        ]">
                            {{ initials(review.author) }}
                        </span>

                        <div>
                            <div :class="['font-medium', review.featured ? 'text-white' : 'text-default-950']">
                                {{ review.author }}
                            </div>
                            <div :class="['text-xs', review.featured ? 'text-white/45' : 'text-default-500']">
                                Verified session
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

type ReviewType = {
  title: string
  date: string
  content: string
  author: string
  featured?: boolean
}

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase()

const reviewData: ReviewType[] = [
  {
    title: 'Kinjal feels like home',
    date: 'January 19, 2026',
    content: 'Kinjal feels like home. Familiar, safe and understanding. Her energy is so grounding that simply by talking to her, I start looking at things with a fresh perspective and that feeling of being stuck vanishes away. Love all of my sessions with her, truly makes me feel lighter ❤️',
    author: 'Manvi Gupta'
  },
  {
    title: 'A true listener and healer',
    date: 'January 12, 2026',
    content: "Kinjal is one of those people you can instantly connect with! She makes you feel heard & seen! She's very generous with her guidance and never have I felt the need to doubt her! She's someone you can vouch for being an amazing listener for all your problems!",
    author: 'Heta'
  },
  {
    title: "You're in good hands here",
    date: 'December 18, 2025',
    content: "Kinjal is one of those people who truly listens, not just hearing words, but understanding what's beneath us. She has always created a space where I feel safe, seen, and genuinely heard. She's fully present, with no distractions, no agenda, no rush to fix or advise. She creates this calm, judgment free space where we naturally open up about things they've been carrying alone. If you're looking for someone who will truly listen at your pace, not just wait for their turn to talk, she's the real deal.",
    author: 'Jyot Agnani',
    featured: true
  },
  {
    title: 'One Call to Kinjal = Peace Restored',
    date: 'December 5, 2025',
    content: "Whenever I'm stressed or anxious, a single conversation with Kinjal works like magic. She has this natural ability to calm someone down, clear their head, and make everything feel lighter. Her listening skills are incredible. She understands even what I don't fully say. Honestly, she's my go to person for instant peace and positivity.",
    author: 'Jash Shah'
  },
  {
    title: 'Definitely a safe space and makes you feel heard',
    date: 'December 5, 2025',
    content: 'At times you just want someone to listen to you and not fix any problems. Kinjal exactly does that. Overall a great experience 😃',
    author: 'Jinal'
  }
]
</script>
