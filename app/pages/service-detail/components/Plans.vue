<template>
    <section class="lg:py-27.5 md:py-25 py-15">
        <div class="container">

            <div class="lg:mb-12.5 mb-7.5">
                <div class="mb-2 text-sm text-default-950">{{ eyebrow }}</div>

                <h2 class="mb-5 lg:text-5xl md:text-4xl text-3xl">{{ title }}</h2>

                <div class="lg:max-w-3/5 space-y-2.5">
                    <p v-for="(line, idx) in intro" :key="idx">{{ line }}</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-7.5">
                <!-- Plan Loop -->
                <div v-for="(plan, idx) in plans" :key="idx" class="p-6 rounded-xl border border-default-200 flex flex-col">
                    <div class="text-sm text-default-500 mb-5">{{ plan.number }}</div>

                    <h3 class="text-2xl text-default-950 mb-4">{{ plan.title }}</h3>

                    <div v-if="plan.prices?.length" class="space-y-1.5 mb-6">
                        <div v-for="(price, pIdx) in plan.prices" :key="pIdx" class="text-default-950 font-medium">{{ price }}</div>
                    </div>

                    <hr class="mb-6 border-default-200">

                    <p v-if="plan.description" class="mb-6">{{ plan.description }}</p>

                    <div v-if="plan.features?.length" class="mb-6">
                        <div v-if="plan.featuresTitle" class="mb-2.5 text-default-950">{{ plan.featuresTitle }}</div>

                        <ul role="list" class="space-y-2.5">
                            <li v-for="(feature, fIdx) in plan.features" :key="fIdx" class="flex items-start gap-3">
                                <Icon icon="tabler:square-check" class="shrink-0 mt-1 size-5 text-default-950"></Icon>
                                <span>{{ feature }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-auto pt-2.5 flex flex-wrap gap-2.5">
                        <NuxtLink
                            v-for="(action, aIdx) in plan.actions"
                            :key="aIdx"
                            :to="action.link"
                            class="group py-2.5 px-4.5 inline-flex items-center justify-center gap-5 rounded-lg bg-primary font-medium text-primary-ink transition-all"
                        >
                            <span class="relative block overflow-hidden">
                                <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    {{ action.label }}
                                </span>
                                <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    {{ action.label }}
                                </span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

export type PlanType = {
  number: string
  title: string
  prices?: string[]
  description?: string
  featuresTitle?: string
  features?: string[]
  actions: { label: string, link: string }[]
}

defineProps<{
  eyebrow: string
  title: string
  intro: string[]
  plans: PlanType[]
}>()
</script>
