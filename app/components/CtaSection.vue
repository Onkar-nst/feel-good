<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-10 md:pb-14 lg:pb-16">
        <div class="container max-w-315!">
            <div class="relative overflow-hidden rounded-3xl bg-primary text-center grain lg:py-20 lg:px-24 py-12 px-5"
                 data-reveal="scale">

                <!-- Kept faint deliberately: the band should read as one solid butter
                     panel, with the auras only softening the corners. -->
                <div class="absolute inset-0" aria-hidden="true">
                    <div class="aura animate-drift size-72 -top-20 -start-14 bg-white/15"></div>
                    <div class="aura animate-drift delay-2 size-64 -bottom-16 -end-8 bg-peach-soft/20"></div>
                </div>

                <div class="relative">
                    <div class="eyebrow mb-5 text-primary-ink/70!">
                        Join Us Today
                    </div>

                    <h2 class="h-display text-primary-ink lg:text-5xl md:text-4xl text-3xl mb-4">
                        Ready to Feel Good Again?
                    </h2>

                    <p class="mb-10 lg:max-w-[52ch] mx-auto text-primary-ink/85">
                        Book your listening session and give yourself the space to let it out and feel a little lighter.
                    </p>

                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <NuxtLink to="/contact" class="btn-light btn-lg group">
                            <span>Book a Session</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                        </NuxtLink>

                        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"
                           class="btn btn-lg border border-primary-ink/25 text-primary-ink hover:bg-white/40">
                            <Icon icon="tabler:brand-whatsapp" class="size-5" />
                            <span>Chat on WhatsApp</span>
                        </a>
                    </div>

                    <p class="mt-8 text-sm text-primary-ink/65">
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

const whatsappLink =
    'https://wa.me/919004989199?text=' +
    encodeURIComponent("Hi! I'd like to know more about booking a listening session.")
</script>
