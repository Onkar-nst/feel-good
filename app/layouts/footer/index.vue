<template>
  <!-- Footer -->
  <footer class="pt-12 md:pt-14 lg:pt-16 pb-10 bg-default-950">
    <div class="container">
      <div class="grid lg:grid-cols-9 lg:gap-20 gap-7.5">
        <!-- Logo + Contact -->
        <div class="lg:col-span-2">
          <div class="h-full flex lg:flex-col md:flex-row flex-wrap items-start justify-between gap-12">
            <img src="/images/logo-fgc-light.png" class="h-10 w-auto" alt="The Feel Good Center" />

            <div class="space-y-3">
              <h3 class="text-default-400 text-sm">Say hello to us!</h3>
              <a href="mailto:info@thefeelgoodcenter.in" class="block text-white transition duration-300 hover:text-default-400">
                info@thefeelgoodcenter.in
              </a>
              <a href="tel:+919004989199" class="block text-white transition duration-300 hover:text-default-400">
                +91 9004989199
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <!-- Pages -->
          <div>
            <div class="grid lg:grid-cols-2 gap-7.5">
              <div class="flex lg:flex-col md:flex-row flex-wrap items-start gap-2.5">
                <h3 class="w-full text-sm text-default-400 mb-1.5">Pages</h3>
                <NuxtLink v-for="(item, index) in pageLinkData" :key="index" :to="item.link" class="inline-flex text-white transition duration-300 hover:text-default-400">{{ item.name }}</NuxtLink>
              </div>

              <div class="flex lg:flex-col md:flex-row flex-wrap items-start gap-2.5">
                <h3 class="w-full text-sm text-default-400 mb-1.5">Services</h3>
                <NuxtLink v-for="(item, index) in serviceLinkData" :key="index" :to="item.link" class="inline-flex text-white transition duration-300 hover:text-default-400">{{ item.name }}</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Closing note -->
          <div class="flex flex-wrap items-center lg:gap-10 gap-6 lg:mt-15 mt-7.5">
            <h3 class="text-white text-xl">Let's talk. Let's feel good.</h3>

            <NuxtLink to="/contact" class="group py-4 px-8 inline-flex items-center justify-center rounded-lg bg-white text-primary-ink font-medium transition-all">
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

        <!-- Reach out -->
        <div class="lg:col-span-2">
          <h3 class="text-white mb-4 font-medium">Reach out to us</h3>

          <div class="space-y-4">
            <div>
              <div class="text-default-400 text-sm mb-1.5">Address</div>
              <p class="text-white">Mumbai, India.</p>
            </div>

            <p class="text-default-400 text-sm">A safe, judgment free space to talk, express, and feel lighter.</p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-10 border-default-800" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <!-- Copyright -->
        <p class="text-sm text-white text-center md:text-start">
          Copyright © 2026 The Feel Good Center
        </p>

        <p class="text-sm text-default-400 text-center md:text-end">
          No therapy. No fixing. Just listening, with heart.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';

type LinkType = {
  name: string
  link: string
}

const pageLinkData: LinkType[] = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Blog', link: '/blog' },
  { name: 'Contact', link: '/contact' }
]

const serviceLinkData: LinkType[] = [
  { name: 'All Services', link: '/service-detail' },
  { name: 'Personal Listening Service', link: '/service-detail/personal' },
  { name: 'Corporate Services', link: '/service-detail/corporate' }
]
</script>
