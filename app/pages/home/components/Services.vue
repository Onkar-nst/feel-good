<template>
    <section class="relative pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16 bg-body-bg overflow-hidden">

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

                <div class="mx-auto lg:max-w-[62ch] space-y-2.5" data-reveal="up" style="--reveal-delay:120ms">
                    <p>The Feel Good Center offers one to one listening sessions led with warmth, compassion, and zero judgment.</p>
                    <p>Whether you're overwhelmed, lonely, stressed, or just need to get something off your chest. We're here to hold space for you.</p>
                    <p class="text-default-950 font-medium">No therapy. No fixing. Just listening, with heart.</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5" data-reveal-group>

                <NuxtLink
                    v-for="(service, idx) in serviceData"
                    :key="idx"
                    :to="service.link"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-cream rounded-2xl p-7 pt-14 flex flex-col gap-6 border border-default-200/70 hover:border-primary/30"
                >
                    <!-- Watermark number, sits behind everything -->
                    <span class="pointer-events-none absolute -top-3 end-4 font-heading text-7xl text-default-950/[0.04] transition-all duration-700 ease-soft group-hover:text-pink/10 group-hover:-translate-y-1">
                        {{ service.number }}
                    </span>

                    <div class="relative">
                        <h3 class="mb-2 text-2xl h-display">{{ service.title }}</h3>
                        <p class="text-default-600">{{ service.description }}</p>
                    </div>

                    <div class="relative mt-auto flex items-center gap-2 font-medium text-default-950">
                        <span class="relative">
                            Learn More
                            <span class="absolute -bottom-0.5 start-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100"></span>
                        </span>
                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 -rotate-45 transition-transform duration-500 ease-soft group-hover:rotate-0 group-hover:translate-x-1" />
                    </div>
                </NuxtLink>

                <!-- Sixth cell: catches anyone who didn't see themselves in the five above -->
                <NuxtLink
                    to="/contact"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden rounded-2xl p-7 pt-14 flex flex-col justify-between gap-6 bg-default-950 text-white grain"
                >
                    <div class="aura animate-breathe size-52 -bottom-16 -end-10 bg-primary/18"></div>

                    <div class="relative">
                        <h3 class="mb-2 text-2xl h-display text-white">Not sure which one?</h3>
                        <p class="text-white/65">Tell us what's going on and we'll suggest the right starting point. No pressure either way.</p>
                    </div>

                    <div class="relative mt-auto inline-flex items-center gap-2 font-medium">
                        <span>Start a conversation</span>
                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1.5" />
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type ServiceType = {
  number: string
  title: string
  description: string
  link: string
}

const serviceData: ServiceType[] = [
  {
    number: '01.',
    title: '1:1 Virtual Listening Sessions',
    description: "Release What's Heavy, Safely and Freely",
    link: '/service-detail/personal'
  },
  {
    number: '02.',
    title: 'Monthly/Weekly Check In Plans',
    description: 'Not just support. Consistent care.',
    link: '/service-detail/personal'
  },
  {
    number: '03.',
    title: 'Gift a Session',
    description: 'Because everyone deserves to be heard.',
    link: '/service-detail/personal'
  },
  {
    number: '04.',
    title: 'Follow Up Sessions',
    description: 'Not just support. Consistent care.',
    link: '/service-detail/personal'
  },
  {
    number: '05.',
    title: 'Corporate Plans',
    description: 'Not just support. Consistent care.',
    link: '/service-detail/corporate'
  }
]
</script>
