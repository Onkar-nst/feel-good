<template>
    <section class="relative size-full overflow-hidden md:py-14.5 py-10">

        <div class="container">
            <div class="grid lg:grid-cols-5 lg:gap-25 gap-10">
                <div class="lg:col-span-3">
                    <div class="flex flex-col lg:gap-15 gap-7.5 h-full">
                        <div>
                            <div class="mb-2.5 text-sm text-default-950">Explore Our Offerings</div>

                            <h1 class="lg:text-[56px] md:text-5xl text-4xl text-default-950 mb-2.5">Understanding and Supporting Your Journey</h1>

                            <p>A safe, judgment free space to talk, express, and feel lighter. One session. One conversation. One step toward emotional ease.</p>

                            <div class="mt-11 inline-flex items-center lg:gap-7.5 md:gap-20 gap-4">
                                <NuxtLink to="/contact" class="group py-5 px-10 inline-flex items-center justify-center gap-5 rounded-lg bg-primary text-primary-ink font-medium transition-all">
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

                        <div class="mt-auto">
                            <h2 class="mb-2.5 text-xl">What we offer</h2>

                             <div class="flex flex-wrap items-center gap-4">
                                <div v-for="(offer, idx) in offers" :key="idx" class="py-2.5 px-4 rounded bg-default-100 text-default-950">
                                    {{ offer }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div class="hero-image-one-wrap">
                        <img class="size-full object-cover rounded-lg" :src="image" alt="Image">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'

withDefaults(defineProps<{
  offers: string[]
  image?: string
}>(), {
  image: '/images/service/1.jpg'
})
</script>
