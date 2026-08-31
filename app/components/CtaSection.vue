<template>
    <section class="pt-8 pb-10 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-default-950 text-center grain lg:py-20 lg:px-24 py-12 px-5"
                 data-reveal="scale">

                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-96 -top-24 -start-16 bg-primary/18"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-20 -end-10 bg-accent/30"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-white/70!">
                        Join Us Today
                    </div>

                    <h2 class="h-display text-white lg:text-5xl md:text-4xl text-3xl mb-4">
                        Ready to Share Your Story?
                    </h2>

                    <p class="mb-10 lg:max-w-[52ch] mx-auto text-white/70">
                        Book your listening session now and embrace the healing journey with us.
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <NuxtLink to="/contact" class="btn-light btn-lg group">
                            <span>Book a Session</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                        </NuxtLink>

                        <a href="tel:+919004989199"
                           class="btn btn-lg border border-white/25 text-white hover:bg-white/10">
                            <Icon icon="tabler:phone" class="size-5" />
                            <span>+91 9004989199</span>
                        </a>
                    </div>

                    <p class="mt-8 text-sm text-white/45">
                        Confidential &middot; No judgment &middot; No obligation to continue
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'
</script>
