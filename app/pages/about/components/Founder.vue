<template>
    <section id="founder" class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 scroll-mt-24">
        <div class="container">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-12">

                <!-- ── Portrait collage ─────────────────────────────── -->
                <!-- Sticky from lg up, so the photos stay in view while the letter
                     scrolls past. Below lg the column stacks and scrolls normally. -->
                <div class="relative lg:sticky lg:top-28 lg:self-start">

                    <!-- Overlapping stack rather than a tidy two-up grid: one large
                         portrait anchors it, the second photo and the quote card sit over its
                         right edge at different heights so the block has some depth. The ring
                         is painted in the page colour, which reads as a clean cut-out gap.
                         Below sm it all falls back to a simple stack.
                         data-reveal sits here, not on the sticky element: the reveal leaves a
                         permanent will-change/transform behind, which can disturb pinning. -->
                    <div class="relative" data-reveal="scale">

                        <div class="group relative w-full sm:w-[74%] aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_70px_-45px_rgb(28_22_20/0.5)]">
                            <img src="/images/other/kinjal-portrait-linen.jpg" alt="Kinjal Shah, founder of The Feel Good Centre"
                                 class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                        </div>

                        <div class="animate-float mt-4 sm:mt-0 sm:absolute sm:end-0 sm:top-10 sm:w-[47%] rounded-2xl bg-white p-5 shadow-[0_20px_50px_-24px_rgb(28_22_20/0.45)]">
                            <div class="mb-2.5 flex size-9 items-center justify-center rounded-full bg-peach-soft text-peach">
                                <Icon icon="tabler:ear" class="size-5" />
                            </div>
                            <p class="text-sm text-default-700">
                                &ldquo;Sometimes, being heard is enough to feel lighter.&rdquo;
                            </p>
                        </div>

                        <div class="group mt-4 sm:mt-0 sm:absolute sm:end-0 sm:bottom-6 sm:w-[54%] aspect-[3/2] overflow-hidden rounded-2xl sm:ring-8 sm:ring-body-bg shadow-[0_24px_60px_-35px_rgb(28_22_20/0.55)]">
                            <img src="/images/other/kinjal-studio-1.jpg" alt="Kinjal Shah during a listening session"
                                 class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                        </div>
                    </div>
                </div>

                <!-- ── The letter ───────────────────────────────────── -->
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        About Us
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-6" data-reveal="up">
                        Welcome to <br class="hidden md:block"> The Feel Good Centre
                    </h2>

                    <div class="space-y-4 text-default-600" data-reveal-group>
                        <p class="text-lg text-default-800" data-reveal="up">
                            Hi, I'm Kinjal Shah, a 33 year old woman who's spent her life observing
                            people, connecting with them, and understanding how deeply we all crave to
                            be heard. I come from a big, beautiful joint family where emotions run deep
                            and conversations are everything.
                        </p>

                        <p data-reveal="up">
                            Over the past 10 years, I've worked in the events and hospitality industry
                            as a freelancer and wedding choreographer, roles that allowed me to meet and
                            interact with thousands of people from all walks of life.
                        </p>

                        <p data-reveal="up">
                            What I've come to realise through these years is simple yet powerful:
                            <span class="text-default-950 font-medium">most people don't have someone
                            they can truly talk to.</span> Someone who listens without judging, without
                            interrupting, and without offering unsolicited advice. Just a safe, kind,
                            and open space to let your thoughts out. And that's exactly what I want to
                            offer you here.
                        </p>

                        <p data-reveal="up">
                            This service was born from my heart, from witnessing the quiet loneliness in
                            so many around me, despite the noise of the world. Whether you're going
                            through a tough phase, feeling overwhelmed, or just need a space to talk
                            about your day without filters, I'm here for you.
                        </p>

                        <p class="border-s-2 border-primary ps-5 text-lg text-default-950" data-reveal="up">
                            I believe in the power of listening. Not the kind that waits to reply, but
                            the kind that makes you feel seen, heard, and lighter just by being able
                            to share.
                        </p>

                        <p data-reveal="up">
                            If you've been carrying too much in silence, please know that you don't
                            have to anymore. Even just one session can bring a sense of ease and
                            clarity. So if you're looking for someone who truly listens, with kindness
                            and compassion, I'm just a message away.
                        </p>

                        <p class="text-lg text-default-950" data-reveal="up">
                            Let's talk. Let's feel good. Together.
                        </p>
                    </div>

                    <!-- Signature -->
                    <div class="mt-9 flex flex-wrap items-end justify-between gap-6" data-reveal="up">
                        <div>
                            <img src="/images/other/sign-kinjal.png" alt="Kinjal Shah's signature" class="signature h-14">

                            <div class="mt-3">
                                <h3 class="text-lg h-display mb-1">Kinjal Shah</h3>
                                <div class="text-default-600">Founder, The Feel Good Centre</div>
                            </div>
                        </div>

                        <NuxtLink to="/contact" class="btn-primary btn-fill btn-lg group">
                            <span>Talk to Kinjal</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'
</script>
