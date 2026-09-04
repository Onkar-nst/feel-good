<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 bg-default-100">
        <div class="container">
            <div class="grid md:grid-cols-3 lg:gap-25 gap-7.5">
                <div>
                    <div class="size-full">
                        <img src="/images/service/details-image.jpg" alt="Image" class="size-full object-cover rounded-lg">
                    </div>
                </div>

                <div class="md:col-span-2">
                    <div class="mb-10">
                        <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-5">About the Service</h2>

                        <div class="space-y-4">
                            <p>At The Feel Good Centre, we offer a safe, judgment free space for genuine human connection through one to one listening sessions and emotional wellness plans. Whether you're seeking personal support to feel lighter and more balanced, or you're a company looking to nurture employee wellbeing, our services are designed to make people feel heard, valued, and supported.</p>

                            <p>With both individual and corporate solutions, we focus on creating emotional clarity, reducing stress, and building healthier, more connected lives and workplaces.</p>
                        </div>
                    </div>

                    <div class="mb-10">
                        <h3 class="h-display text-xl mb-5">What We Bring:</h3>

                        <ul role="list" class="space-y-2.5">
                            <li v-for="(point, idx) in pointData" :key="idx" class="flex items-start gap-3">
                                <Icon icon="tabler:square-check" class="shrink-0 mt-1 size-5 text-default-950"></Icon>
                                <span>{{ point }}</span>
                            </li>
                        </ul>
                    </div>

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

            <div class="lg:mt-15 md:mt-12.5 mt-7.5">
                <div class="bg-white rounded-xl lg:p-12.5 p-6 text-center space-y-5">
                    <p class="lg:text-2xl text-xl text-default-950 lg:max-w-4/5 mx-auto">This isn't therapy, advice, or coaching. It's simply human connection, the kind we all need but rarely find.</p>

                    <p class="lg:max-w-3/5 mx-auto">If you're ready to feel a little more at peace, a little more understood, and a lot more like yourself, we're here for you.</p>

                    <div class="text-default-950">
                        <div>Let's talk. Let's feel good.</div>
                        <div class="mt-1.5 text-sm text-default-500">The Feel Good Centre</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

const pointData: string[] = [
  'A confidential and compassionate listening session.',
  'A judgment free zone to express your thoughts and emotions.',
  'An opportunity to feel mentally and emotionally lighter.',
  'A real connection that helps you pause, breathe, and just be.'
]
</script>
