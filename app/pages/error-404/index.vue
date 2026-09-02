<template>
     <section class="relative bg-white lg:py-50 py-25">
        <div class="container">
            <div class="relative z-10 bg-white w-150 mx-auto border border-default-300 rounded overflow-hidden">
                <div class="lg:p-15 p-10 text-center flex flex-col gap-5">
                    <h2 class="h-display lg:text-6xl text-4xl">404</h2>

                    <h3 class="h-display lg:text-3xl text-2xl">Page not found</h3>

                    <p class="text-default-600 mb-4">The page you are looking for doesn't exist or has been moved.</p>

                    <div class="grid">
                        <NuxtLink to="/" class="group py-5 px-10 inline-flex items-center justify-center gap-5 rounded-lg bg-primary font-medium text-primary-ink transition-all">
                            <span class="relative block overflow-hidden">
                                <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Back to Home
                                </span>
                                <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                    Back to Home
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
import { NuxtLink } from '#components';

definePageMeta({
  layout: false
})

usePageTitle('404 Page Not Found')
</script>
