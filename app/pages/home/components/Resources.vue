<template>
    <section class="pt-6 md:pt-7 lg:pt-8 pb-6 md:pb-7 lg:pb-8 bg-cream">
        <div class="container">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Resources
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        Blogs, Guides &amp; Stories
                    </h2>
                </div>

                <NuxtLink to="/blog" class="btn-outline btn-lg group" data-reveal="up" style="--reveal-delay:120ms">
                    <span>Read Everything</span>
                    <Icon icon="tabler:arrow-right"
                          class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                </NuxtLink>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5" data-reveal-group>
                <NuxtLink
                    v-for="(post, idx) in postData"
                    :key="idx"
                    :to="post.link"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden rounded-2xl border border-default-200/70 bg-white flex flex-col hover:border-primary/30"
                >
                    <div class="overflow-hidden">
                        <img :src="post.image" :alt="post.title"
                             class="h-52 w-full object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    </div>

                    <div class="flex flex-1 flex-col gap-4 p-6">
                        <div>
                            <div class="eyebrow mb-3">{{ post.tag }}</div>

                            <h3 class="mb-1.5 text-lg h-display leading-snug">{{ post.title }}</h3>

                            <p class="text-sm text-default-600">{{ post.excerpt }}</p>
                        </div>

                        <div class="mt-auto flex items-center gap-2 font-medium text-default-950">
                            <span class="relative">
                                Read Post
                                <span class="absolute -bottom-0.5 start-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100"></span>
                            </span>
                            <Icon icon="tabler:arrow-narrow-right"
                                  class="size-5 -rotate-45 transition-transform duration-500 ease-soft group-hover:rotate-0 group-hover:translate-x-1" />
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'

type PostType = {
  image: string
  tag: string
  title: string
  excerpt: string
  link: string
}

const postData: PostType[] = [
  {
    image: '/images/blog/1.webp',
    tag: 'Story',
    title: 'Technology vs. Human: Why Heartfelt Listening Still Matters in an AI Age',
    excerpt: "Chatbots can check in. But they can't feel with you. Here's why real human presence still matters, especially when you're overwhelmed.",
    link: '/blog-details'
  },
  {
    image: '/images/blog/2.webp',
    tag: 'Guide',
    title: 'Overwhelmed by Career Pressure? Try This Mini Emotional Reset',
    excerpt: 'Short on time but heavy in your mind? This 30 minute check in may be all you need.',
    link: '/blog-details'
  },
  {
    image: '/images/blog/5.webp',
    tag: 'Blog',
    title: 'Why Talking May Be More Healing Than Therapy for Some',
    excerpt: 'Understanding the quiet power of being truly heard, without judgment, diagnosis, or pressure.',
    link: '/blog-details'
  }
]
</script>
