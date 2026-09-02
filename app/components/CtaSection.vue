<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-lagoon text-center grain lg:py-20 lg:px-24 py-12 px-5"
                 data-reveal="scale">

                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-96 -top-24 -start-16 bg-white/45"></div>
                    <div class="aura animate-drift delay-2 size-80 -bottom-20 -end-10 bg-primary-soft/60"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-lagoon-ink/70!">
                        Join Us Today
                    </div>

                    <h2 class="h-display text-lagoon-ink lg:text-5xl md:text-4xl text-3xl mb-4">
                        Ready to Share Your Story?
                    </h2>

                    <p class="mb-10 lg:max-w-[52ch] mx-auto text-lagoon-ink/85">
                        Book your listening session now and embrace the healing journey with us.
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <NuxtLink to="/contact" class="btn-light btn-lg group">
                            <span>Book a Session</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                        </NuxtLink>

                        <a href="tel:+919004989199"
                           class="btn btn-lg border border-lagoon-ink/25 text-lagoon-ink hover:bg-white/40">
                            <Icon icon="tabler:phone" class="size-5" />
                            <span>+91 9004989199</span>
                        </a>
                    </div>

                    <p class="mt-8 text-sm text-lagoon-ink/65">
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
