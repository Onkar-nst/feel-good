<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 relative bg-body-bg overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-3 size-[26rem] -top-32 end-1/4 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">

            <div class="text-center lg:mb-14 mb-10">
                <div class="eyebrow mb-5" data-reveal="soft">
                    Our Services
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    Real Conversations. Zero Judgment.
                </h2>

                <div class="mx-auto lg:max-w-[56ch]" data-reveal="up" style="--reveal-delay:120ms">
                    <p class="text-lg text-pretty">
                        The Feel Good Centre offers one to one listening sessions led with warmth,
                        compassion, and zero judgment. Whether you're overwhelmed, lonely, stressed,
                        or just need to get something off your chest, we're here to hold space for you.
                    </p>

                    <p class="mt-6 text-lg font-medium text-default-950 text-balance">
                        No therapy. No fixing. Just listening, with heart.
                    </p>
                </div>
            </div>

            <SessionGrid />

        </div>
    </section>
</template>

<script setup lang="ts">
import SessionGrid from '~/components/SessionGrid.vue'
</script>
