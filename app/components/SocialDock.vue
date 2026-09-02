<template>
    <div class="fixed bottom-5 end-5 md:bottom-7 md:end-7 z-50 flex flex-col items-end gap-3">
        <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="link.aria"
            :class="[
                'group relative inline-flex size-12 md:size-13 items-center justify-center rounded-full text-white transition-all duration-500 ease-soft hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3',
                link.classes
            ]"
        >
            <!-- Resting pulse on WhatsApp only, so one button draws the eye rather than three -->
            <span
                v-if="link.pulse"
                class="animate-pulse-whatsapp pointer-events-none absolute inset-0 rounded-full group-hover:animate-none"
                aria-hidden="true"
            ></span>

            <Icon :icon="link.icon" class="relative size-6 shrink-0" />

            <!-- Label slides out to the left on hover. Pointer devices only. -->
            <span
                class="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap rounded-full bg-default-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 ease-soft group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
            >
                {{ link.label }}
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

/*
 * TODO — replace these two with the real profile URLs.
 * They currently point at the platform home pages, not a profile, so an
 * unreplaced link is harmless rather than sending someone to a stranger.
 */
const INSTAGRAM_URL = 'https://www.instagram.com/'
const FACEBOOK_URL = 'https://www.facebook.com/'

// Digits only, wa.me rejects '+' and spaces.
const WHATSAPP_PHONE = '919004989199'
const WHATSAPP_MESSAGE = "Hi! I found The Feel Good Center online and I'd like to know more about booking a listening session."

type LinkType = {
  label: string
  aria: string
  href: string
  icon: string
  classes: string
  pulse?: boolean
}

const links: LinkType[] = [
  {
    label: 'Instagram',
    aria: 'The Feel Good Center on Instagram',
    href: INSTAGRAM_URL,
    icon: 'tabler:brand-instagram',
    // Instagram has no single brand colour, so its usual corner gradient
    classes:
      'bg-[linear-gradient(45deg,#F09433_0%,#E6683C_25%,#DC2743_50%,#CC2366_75%,#BC1888_100%)] shadow-[0_8px_24px_-6px_rgb(220_39_67_/_0.5)] hover:shadow-[0_12px_32px_-6px_rgb(220_39_67_/_0.6)] focus-visible:outline-[#DC2743]'
  },
  {
    label: 'Facebook',
    aria: 'The Feel Good Center on Facebook',
    href: FACEBOOK_URL,
    icon: 'tabler:brand-facebook',
    classes:
      'bg-[#1877F2] hover:bg-[#0F62D0] shadow-[0_8px_24px_-6px_rgb(24_119_242_/_0.5)] hover:shadow-[0_12px_32px_-6px_rgb(24_119_242_/_0.6)] focus-visible:outline-[#1877F2]'
  },
  {
    label: 'Chat on WhatsApp',
    aria: 'Chat with The Feel Good Center on WhatsApp',
    href: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    icon: 'tabler:brand-whatsapp',
    classes:
      'bg-[#25D366] hover:bg-[#1EBE5A] shadow-[0_8px_24px_-6px_rgb(37_211_102_/_0.55)] hover:shadow-[0_12px_32px_-6px_rgb(37_211_102_/_0.65)] focus-visible:outline-[#1EBE5A]',
    pulse: true
  }
]
</script>
