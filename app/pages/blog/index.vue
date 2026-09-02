<template>
     <section class="relative size-full overflow-hidden md:py-20 py-12">
        <div class="container">
            <div class="mb-12.5 text-center">
                <h1 class="h-display lg:text-[64px] md:text-5xl text-[38px] leading-[1.08] mb-5">Discover Your Path to Wellbeing</h1>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-7.5">
                <!-- Card Loop -->
                <div v-for="(post, idx) in blogPostData" :key="idx" class="relative rounded-lg overflow-hidden group bg-default-100 p-2">
                    <NuxtLink :to="post.link" class="absolute inset-0 z-10"></NuxtLink>

                    <div class="overflow-hidden rounded">
                        <img :src="post.image" :alt="post.title" class="size-full rounded object-cover group-hover:scale-105 transition-all duration-300">
                    </div>

                    <div class="flex flex-col gap-5 p-4">
                        <div>
                            <div class="text-sm text-default-500 mb-3">{{ post.date }}</div>

                            <h3 class="mb-1.5 text-lg h-display leading-snug">{{ post.title }}</h3>

                            <p class="text-sm">{{ post.excerpt }}</p>
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

type BlogPost = {
  image: string
  date: string
  title: string
  excerpt: string
  link: string
}

const blogPostData: BlogPost[] = [
  {
    image: '/images/blog/1.webp',
    date: 'September 5, 2025',
    title: 'Technology vs. Human: Why Heartfelt Listening Still Matters in an AI Age',
    excerpt: "Chatbots can check in. But they can't feel with you. Here's why real human presence still matters, especially when you're overwhelmed.",
    link: '/blog-details'
  },
  {
    image: '/images/blog/2.webp',
    date: 'September 5, 2025',
    title: 'Overwhelmed by Career Pressure? Try This Mini Emotional Reset',
    excerpt: 'Short on time but heavy in your mind? This 30 minute check in may be all you need.',
    link: '/blog-details'
  },
  {
    image: '/images/blog/3.webp',
    date: 'May 17, 2025',
    title: 'How Emotional Check Ins at Work Boost Productivity',
    excerpt: 'Why psychological safety drives performance more than pressure ever could.',
    link: '/blog-details'
  },
  {
    image: '/images/blog/4.webp',
    date: 'May 17, 2025',
    title: 'When Workplace Gaslighting Leaves You Questioning Yourself',
    excerpt: 'Understanding subtle manipulation at work, and how reclaiming your voice starts with being heard.',
    link: '/blog-details'
  },
  {
    image: '/images/blog/5.webp',
    date: 'May 17, 2025',
    title: 'Why Talking May Be More Healing Than Therapy for Some',
    excerpt: 'Understanding the quiet power of being truly heard, without judgment, diagnosis, or pressure.',
    link: '/blog-details'
  }
]

usePageTitle('Blog')
</script>
