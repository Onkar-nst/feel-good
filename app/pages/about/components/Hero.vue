<template>
    <section class="relative size-full overflow-hidden md:py-14.5 py-10">

        <div class="container max-w-315!">
            <div class="mb-12.5 text-center">
                <div class="mb-2.5 text-sm text-default-950">Find Your Voice, Feel Better</div>

                <h1 class="lg:text-[56px] md:text-5xl text-4xl text-default-950 mb-2.5">A Quiet Space In A Noisy World.</h1>

                <p class="md:max-w-1/2 mx-auto">A safe, judgment free space to talk, express, and feel lighter. One session. One conversation. One step toward emotional ease.</p>
            </div>

            <div class="mb-2.5">
                <img src="/images/other/about-image-1.jpg" class="size-full rounded-lg" alt="Image">
            </div>

            <div class="grid md:grid-cols-10 gap-4">

                <!-- Card 1 -->
                <div class="md:col-span-3">
                    <div class="h-full relative rounded-xl overflow-hidden p-6 text-white bg-[url('/images/other/about-bg.jpg')] bg-cover bg-center">

                        <div class="absolute inset-0 bg-black/40"></div>

                        <div class="relative z-10 space-y-3">

                            <span class="text-xs inline-flex px-3 py-1 bg-white/20 rounded-md backdrop-blur">
                                Happy Clients
                            </span>

                            <div>
                                <h2 class="text-4xl text-white mb-8">2200+</h2>
                                <p class="text-white mt-2">Fully, Truly, Kindly.</p>
                            </div>

                        </div>
                    </div>
                </div>


                <!-- Card 2 -->
                <div class="md:col-span-4">
                    <div class="h-full bg-default-950 rounded-xl p-6 flex flex-col justify-between">

                        <h3 class="text-2xl leading-snug text-white">
                            You're not alone in how you feel.
                            <span class="text-default-400">Let's talk. I'm here to listen.</span>
                        </h3>

                        <div class="mt-8">
                            <NuxtLink to="/contact" class="group py-3 px-4.5 inline-flex items-center justify-center gap-5 rounded-xl bg-white text-primary-ink font-medium transition-all">
                                <span class="relative block overflow-hidden">
                                    <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Book a Session
                                    </span>
                                    <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Book a Session
                                    </span>
                                </span>
                            </NuxtLink>
                        </div>

                    </div>
                </div>


                <!-- Card 3 -->
                <div class="md:col-span-3">
                    <div class="h-full bg-default-100 rounded-xl p-6 flex flex-col justify-between">

                        <span class="text-xs px-3 py-1 bg-white rounded-md w-fit">
                            Years Of Experience
                        </span>

                        <div class="mt-6">
                            <h3 class="text-4xl font-semibold text-default-900">7+</h3>
                            <p class="text-default-600 mt-2">
                                No therapy. No fixing. Just listening, with heart.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
</script>
