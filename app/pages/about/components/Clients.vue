<template>
     <section class="lg:py-27.5 md:py-25 py-15">
        <div class="container max-w-315!">

            <div class="mb-12.5">
                <div class="mb-2.5 text-sm text-default-950">Our Commitment</div>

                <h2 class="lg:text-5xl md:text-4xl text-3xl">Mission and Values of The Feel Good Center</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-5">
                <div>
                    <div class="border border-default-200 rounded-xl lg:p-10 p-5 lg:pb-16 pb-12 h-full flex flex-col md:items-start items-center lg:text-start text-center justify-between gap-12">

                        <h2 class="mb-12.5 text-2xl">Mission Statement</h2>
                        <p class="text-default-950">To provide a compassionate and confidential space where people feel truly heard, supported, and emotionally lighter through intentional, heartfelt listening.</p>

                    </div>
                </div>

                <div>
                    <div class="relative rounded-xl overflow-hidden">

                        <img src="/images/other/cta-bg.jpg" class="w-full h-full object-cover" alt="Image">

                        <div class="absolute lg:inset-10 inset-5 p-5 bg-white rounded-lg overflow-auto">

                            <div class="space-y-7.5">
                                <div>
                                    <div class="mb-1.5 text-sm text-default-500">Our Purpose</div>
                                    <h2 class="text-2xl">Vision Statement</h2>
                                </div>

                                <p class="text-default-950">To normalize emotional expression and make authentic listening, free of judgment, accessible to anyone who needs it, one conversation at a time.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5 bg-default-950 rounded-xl lg:p-10 p-5">
                <div class="mb-7.5">
                    <div class="mb-1.5 text-sm text-default-400">Core Principles</div>
                    <h2 class="text-2xl text-white">Values That Drive Us</h2>
                </div>

                <ul role="list" class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-4">
                    <li v-for="(value, idx) in valueData" :key="idx" class="flex items-start gap-3">
                        <Icon icon="tabler:square-check" class="shrink-0 mt-1 size-5 text-white"></Icon>
                        <span class="text-default-400">{{ value }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const valueData: string[] = [
  'Compassion over correction',
  'Presence over performance',
  'Listening over lecturing',
  'Connection over convenience',
  'Honesty, kindness, and confidentiality'
]
</script>
