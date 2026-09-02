<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container">
            <div class="grid lg:grid-cols-2 lg:gap-16 gap-10">

                <div class="flex flex-col lg:gap-20 md:gap-12 gap-10 h-full">
                    <div>
                        <div class="eyebrow mb-5" data-reveal="soft">
                            Meet Kinjal
                        </div>

                        <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-6" data-reveal="up">
                            Why I Chose to <br> Listen, Not to Fix
                        </h2>

                        <div class="space-y-4 text-default-600" data-reveal-group>
                            <p data-reveal="up">Hi, I'm Kinjal Shah, the heart behind The Feel Good Center.</p>

                            <p data-reveal="up">After over a decade in hospitality and events, meeting thousands of people, I noticed something deeply human: most of us just want someone who'll truly listen. That quiet need is what inspired this space.</p>

                            <p data-reveal="up">The Feel Good Center offers a soft landing for your thoughts: no filters, no fixing. Just real, human connection. I'm not a therapist or a coach. I'm a listener, here with care, compassion, and presence.</p>

                            <p class="border-s-2 border-primary ps-5 text-lg text-default-950" data-reveal="up">
                                You're not alone in how you feel. Let's talk. I'm here to listen.
                            </p>
                        </div>

                        <div class="mt-10" data-reveal="up">
                            <NuxtLink to="/about" class="btn-primary btn-fill btn-lg group">
                                <span>Learn More</span>
                                <Icon icon="tabler:arrow-right"
                                      class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="mt-auto" data-reveal="up">
                        <img src="/images/other/sign.svg" alt="Kinjal Shah's signature" class="signature">

                        <div class="mt-3">
                            <h3 class="text-lg h-display mb-1">Kinjal Shah</h3>
                            <div class="text-default-600">Founder, The Feel Good Center</div>
                        </div>
                    </div>
                </div>

                <div class="relative lg:h-full md:h-100 w-full" data-reveal="scale">
                    <div class="group relative size-full overflow-hidden rounded-3xl">
                        <img src="/images/other/about-image.jpg" alt="Kinjal Shah"
                             class="size-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                        <div class="absolute inset-0 bg-linear-to-t from-default-950/35 via-transparent to-transparent"></div>
                    </div>

                    <!-- Floating card, drifting gently over the portrait -->
                    <div class="animate-float absolute -bottom-5 -start-3 md:start-6 max-w-[17rem] rounded-2xl bg-white p-5 shadow-[0_20px_50px_-24px_rgb(28_22_20/0.45)]">
                        <div class="mb-2.5 flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                            <Icon icon="tabler:ear" class="size-5" />
                        </div>
                        <p class="text-sm text-default-700">
                            &ldquo;I'm not here to fix you. I'm here to hear you.&rdquo;
                        </p>
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
