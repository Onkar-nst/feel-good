<template>
    <section class="lg:py-27.5 md:py-25 py-15">
        <div class="container">

            <div class="grid md:grid-cols-2 gap-5">
                <div>
                    <div class="relative rounded-xl overflow-hidden size-full">
                        <img src="/images/other/contact-info.jpg" class="w-full h-full object-cover" alt="Image">
                    </div>
                </div>

                <div>
                    <div class="border border-default-200 rounded-xl p-10 lg:py-16 h-full flex flex-col justify-center gap-10">

                        <div>
                            <h2 class="mb-2.5 lg:text-4xl md:text-3xl text-2xl">Reach Out to Us</h2>

                            <p>We're eager to hear from you. Contact us for support and inquiries about our listening services.</p>
                        </div>

                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="size-12.5 shrink-0 bg-default-100 rounded-full flex items-center justify-center">
                                    <Icon icon="tabler:phone" width="24" height="24" />
                                </div>

                                <div>
                                    <h4 class="mb-1 text-sm text-default-500">Phone</h4>
                                    <a href="tel:+919004989199" class="text-default-950 transition duration-300 hover:text-default-500">+91 9004989199</a>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="size-12.5 shrink-0 bg-default-100 rounded-full flex items-center justify-center">
                                    <Icon icon="tabler:mail" width="24" height="24" />
                                </div>

                                <div>
                                    <h4 class="mb-1 text-sm text-default-500">Email</h4>
                                    <a href="mailto:info@thefeelgoodcenter.in" class="text-default-950 transition duration-300 hover:text-default-500">info@thefeelgoodcenter.in</a>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="size-12.5 shrink-0 bg-default-100 rounded-full flex items-center justify-center">
                                    <Icon icon="tabler:map-pin" width="24" height="24" />
                                </div>

                                <div>
                                    <h4 class="mb-1 text-sm text-default-500">Address</h4>
                                    <p class="text-default-950">Mumbai, India.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>
