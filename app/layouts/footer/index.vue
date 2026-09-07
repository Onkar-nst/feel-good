<template>
  <!-- Footer -->
  <footer class="pt-10 md:pt-12 lg:pt-14 pb-8 bg-mint-soft">
    <div class="container">

      <div class="grid lg:grid-cols-12 md:grid-cols-2 lg:gap-10 gap-8">

        <!-- ── Brand + contact ──────────────────────────────── -->
        <div class="lg:col-span-4">
          <img src="/images/logo-fgc.png" class="h-12 md:h-14 w-auto mb-5" alt="The Feel Good Centre" />

          <p class="text-mint-ink/70 text-sm mb-5 max-w-[34ch]">
            A safe, judgment free space to talk, express, and feel lighter.
          </p>

          <div class="space-y-1.5">
            <a href="mailto:info@thefeelgoodcenter.in" class="block text-mint-ink transition duration-300 hover:text-mint-ink/60">
              info@thefeelgoodcenter.in
            </a>
            <p class="text-mint-ink/70 text-sm pt-1.5">Mumbai, India.</p>
          </div>
        </div>

        <!-- ── Services ─────────────────────────────────────── -->
        <!-- Two sub-columns: nine links in one stack was what made this footer tall. -->
        <div class="lg:col-span-6">
          <h3 class="eyebrow text-mint-ink/65! mb-3.5">Services</h3>

          <!-- CSS columns rather than a grid: a grid couples the row heights, so a
               link that wraps to two lines leaves a gap beside its shorter neighbour. -->
          <div class="sm:columns-2 gap-x-6">
            <NuxtLink v-for="(item, index) in serviceLinkData" :key="index" :to="item.link"
                      class="block mb-2 break-inside-avoid text-sm text-mint-ink transition duration-300 hover:text-mint-ink/60">
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- ── Pages ────────────────────────────────────────── -->
        <div class="lg:col-span-2">
          <h3 class="eyebrow text-mint-ink/65! mb-3.5">Pages</h3>

          <div class="flex md:flex-col flex-wrap items-start gap-x-6 gap-y-2">
            <NuxtLink v-for="(item, index) in pageLinkData" :key="index" :to="item.link"
                      class="text-sm text-mint-ink transition duration-300 hover:text-mint-ink/60">
              {{ item.name }}
            </NuxtLink>
          </div>

        </div>
      </div>

      <!-- ── Closing bar: CTA and legal share one row ────────── -->
      <div class="mt-9 pt-7 border-t border-mint-ink/15 flex flex-col md:flex-row md:items-center justify-between gap-5">

        <div class="flex flex-wrap items-center gap-4">
          <h3 class="h-display text-mint-ink text-lg">Let's talk. Let's feel good.</h3>

          <NuxtLink to="/contact" class="btn-primary btn-fill btn-md group">
            <span>Book a Session</span>
            <Icon icon="tabler:arrow-right"
                  class="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </NuxtLink>
        </div>

        <!-- pe-* keeps this clear of the fixed social dock in the bottom right -->
        <div class="md:text-end text-sm pe-16 md:pe-20">
          <p class="text-mint-ink">Copyright © 2026 The Feel Good Centre</p>
          <p class="text-mint-ink/65">No therapy. No fixing. Just listening, with heart.</p>
          <p class="text-mint-ink/65 mt-1.5">
            Powered by
            <a href="https://kolacommunications.com/" target="_blank" rel="noopener noreferrer"
               class="text-mint-ink underline underline-offset-4 decoration-mint-ink/30 transition duration-300 hover:decoration-mint-ink">
              Kola Communication
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { Icon } from '@iconify/vue'

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
  { name: 'Feeling Overwhelmed & Mentally Drained', link: '/service-detail/feeling-overwhelmed' },
  { name: 'Work Stress & Burnout', link: '/service-detail/work-stress-burnout' },
  { name: 'Breakup & Relationship Support', link: '/service-detail/breakup-relationship-support' },
  { name: 'Feeling Lonely / Having No One to Talk To', link: '/service-detail/feeling-lonely' },
  { name: 'Family Pressure & Expectations', link: '/service-detail/family-pressure' },
  { name: 'Career & Life Confusion', link: '/service-detail/career-life-confusion' },
  { name: 'Living Away from Home', link: '/service-detail/living-away-from-home' },
  { name: 'I Just Need Someone to Talk To', link: '/service-detail/someone-to-talk-to' },
  { name: 'The Strong One', link: '/service-detail/the-strong-one' }
]
</script>
