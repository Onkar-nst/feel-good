<template>
    <section class="lg:py-27.5 md:py-25 py-15 bg-default-100">
        <div class="container">

            <div class="grid lg:grid-cols-2 lg:gap-25 gap-10">
                <div>
                    <div class="mb-2.5 text-sm text-default-950">Our Journey</div>

                    <h2 class="mb-7.5 lg:text-5xl md:text-4xl text-3xl">The Story Behind The Feel Good Center</h2>

                    <div class="space-y-5">
                        <p>Founded with the vision of promoting mental health, The Feel Good Center began as a digital platform catering to those who seek emotional support. Recognizing the challenges people face in expressing their feelings, we focused on creating a space where individuals could openly share, paving the way for future expansions into physical centers.</p>

                        <p>As we grow, The Feel Good Center aims to introduce additional spaces for creative expression. Our journey is rooted in our commitment to listen and support, and we look forward to evolving in ways that further enhance our community's mental health.</p>
                    </div>
                </div>

                <div>
                    <h3 class="mb-7.5 text-xl text-default-950">OUR CERTIFICATES</h3>

                    <div class="space-y-5">
                        <div v-for="(certificate, idx) in certificateData" :key="idx" class="bg-white rounded-xl p-6 flex items-center gap-5">
                            <div class="size-12.5 shrink-0 bg-default-100 rounded-full flex items-center justify-center">
                                <Icon icon="tabler:certificate" width="26" height="26"></Icon>
                            </div>

                            <p class="text-lg text-default-950">{{ certificate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const certificateData: string[] = [
  'Recognized MSME by the Government of India',
  'Certified Diploma in Integrative Counselling'
]
</script>
