<template>
  <!-- Footer -->
  <footer class="pt-10 md:pt-12 lg:pt-14 pb-8 bg-lagoon-soft">
    <div class="container">

      <div class="grid lg:grid-cols-12 md:grid-cols-2 lg:gap-10 gap-8">

        <!-- ── Brand + contact ──────────────────────────────── -->
        <div class="lg:col-span-4">
          <img src="/images/logo-fgc.png" class="h-12 md:h-14 w-auto mb-5" alt="The Feel Good Centre" />

          <p class="text-lagoon-ink/70 text-sm mb-5 max-w-[34ch]">
            A safe, judgment free space to talk, express, and feel lighter.
          </p>

          <div class="space-y-1.5">
            <a href="mailto:info@thefeelgoodcenter.in" class="block text-lagoon-ink transition duration-300 hover:text-lagoon-ink/60">
              info@thefeelgoodcenter.in
            </a>
            <a href="tel:+919004989199" class="block text-lagoon-ink transition duration-300 hover:text-lagoon-ink/60">
              +91 9004989199
            </a>
            <p class="text-lagoon-ink/70 text-sm pt-1.5">Mumbai, India.</p>
          </div>

          <!-- Government registration, shown as proof rather than a claim.
               This is the client's own cropped scan: it carries the registration
               details only, none of the personal address / mobile on the full
               certificate. Do not swap in an uncropped version.
               It lives in this column because the brand block is the short one:
               parked under Pages it left a hole here and a long tail there. -->
          <a href="/images/credentials/udyam-registration.png" target="_blank" rel="noopener noreferrer"
             class="group mt-7 inline-flex items-center gap-3 rounded-xl border border-lagoon-ink/15 bg-white/70 p-2 pe-4 transition-all duration-500 ease-soft hover:border-lagoon-ink/30 hover:-translate-y-0.5"
             aria-label="View the Udyam registration certificate for The Feel Good Centre">
            <img src="/images/credentials/udyam-registration.png"
                 alt="Udyam Registration Certificate, Ministry of Micro, Small and Medium Enterprises, Government of India."
                 loading="lazy" width="601" height="411"
                 class="h-11 w-auto rounded-lg" />

            <span class="leading-tight">
              <span class="block text-xs text-lagoon-ink/65">Registered with MSME, Government of India</span>
              <span class="mt-1 flex items-center gap-1.5 text-xs font-medium text-lagoon-ink">
                <Icon icon="tabler:rosette-discount-check" class="size-3.5 shrink-0" />
                UDYAM-MH-18-0458945
              </span>
            </span>
          </a>
        </div>

        <!-- ── Services ─────────────────────────────────────── -->
        <!-- Two sub-columns: nine links in one stack was what made this footer tall. -->
        <div class="lg:col-span-6">
          <h3 class="eyebrow text-lagoon-ink/65! mb-3.5">Services</h3>

          <!-- CSS columns rather than a grid: a grid couples the row heights, so a
               link that wraps to two lines leaves a gap beside its shorter neighbour. -->
          <div class="sm:columns-2 gap-x-6">
            <NuxtLink v-for="(item, index) in serviceLinkData" :key="index" :to="item.link"
                      class="block mb-2 break-inside-avoid text-sm text-lagoon-ink transition duration-300 hover:text-lagoon-ink/60">
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- ── Pages ────────────────────────────────────────── -->
        <div class="lg:col-span-2">
          <h3 class="eyebrow text-lagoon-ink/65! mb-3.5">Pages</h3>

          <div class="flex md:flex-col flex-wrap items-start gap-x-6 gap-y-2">
            <NuxtLink v-for="(item, index) in pageLinkData" :key="index" :to="item.link"
                      class="text-sm text-lagoon-ink transition duration-300 hover:text-lagoon-ink/60">
              {{ item.name }}
            </NuxtLink>
          </div>

        </div>
      </div>

      <!-- ── Closing bar: CTA and legal share one row ────────── -->
      <div class="mt-9 pt-7 border-t border-lagoon-ink/15 flex flex-col md:flex-row md:items-center justify-between gap-5">

        <div class="flex flex-wrap items-center gap-4">
          <h3 class="h-display text-lagoon-ink text-lg">Let's talk. Let's feel good.</h3>

          <NuxtLink to="/contact" class="btn-primary btn-fill btn-md group">
            <span>Book a Session</span>
            <Icon icon="tabler:arrow-right"
                  class="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </NuxtLink>
        </div>

        <!-- pe-* keeps this clear of the fixed social dock in the bottom right -->
        <div class="md:text-end text-sm pe-16 md:pe-20">
          <p class="text-lagoon-ink">Copyright © 2026 The Feel Good Centre</p>
          <p class="text-lagoon-ink/65">No therapy. No fixing. Just listening, with heart.</p>
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
