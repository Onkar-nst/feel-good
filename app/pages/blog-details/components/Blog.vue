<template>
     <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">
        <div class="container">

            <div class="text-center gap-4 mb-5 md:mb-7.5 lg:mb-15">
                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl">Related Posts</h2>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-7.5 mb-10">
                <div v-for="(blog, idx) in otherBlogData" :key="idx" class="relative rounded-lg overflow-hidden group bg-default-100 p-2">
                    <NuxtLink :to="blog.link" class="absolute inset-0 z-10"></NuxtLink>

                    <div class="overflow-hidden rounded">
                        <img :src="blog.image" :alt="blog.title" class="size-full rounded object-cover group-hover:scale-105 transition-all duration-300">
                    </div>

                    <div class="flex flex-col gap-5 p-4">
                        <div>
                            <div class="text-sm text-default-500 mb-3">{{ blog.date }}</div>

                            <h3 class="mb-1.5 text-lg h-display leading-snug">{{ blog.title }}</h3>

                            <p class="text-sm">{{ blog.excerpt }}</p>
                        </div>

                        <div class="mt-auto flex items-center gap-1.5 text-default-950 underline">
                            <span>Read Post</span>
                            <Icon icon="tabler:arrow-narrow-right" class="size-5 -rotate-45 group-hover:rotate-0 transition duration-300" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type OtherBlogType = {
  title: string
  image: string
  date: string
  excerpt: string
  link: string
}

const otherBlogData: OtherBlogType[] = [
  {
    title: 'Overwhelmed by Career Pressure? Try This Mini Emotional Reset',
    image: '/images/blog/2.webp',
    date: 'September 5, 2025',
    excerpt: 'Short on time but heavy in your mind? This 30 minute check in may be all you need.',
    link: '/blog'
  },
  {
    title: 'When Workplace Gaslighting Leaves You Questioning Yourself',
    image: '/images/blog/4.webp',
    date: 'May 17, 2025',
    excerpt: 'Understanding subtle manipulation at work, and how reclaiming your voice starts with being heard.',
    link: '/blog'
  },
  {
    title: 'Why Talking May Be More Healing Than Therapy for Some',
    image: '/images/blog/5.webp',
    date: 'May 17, 2025',
    excerpt: 'Understanding the quiet power of being truly heard, without judgment, diagnosis, or pressure.',
    link: '/blog'
  }
]
</script>
