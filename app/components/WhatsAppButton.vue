<template>
    <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with The Feel Good Center on WhatsApp"
        class="group fixed bottom-5 end-5 md:bottom-7 md:end-7 z-50 inline-flex h-14 items-center rounded-full bg-[#25D366] px-4 text-white shadow-[0_8px_24px_-6px_rgb(37_211_102_/_0.55)] transition-all duration-500 ease-soft hover:bg-[#1EBE5A] hover:shadow-[0_12px_32px_-6px_rgb(37_211_102_/_0.65)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1EBE5A]"
    >
        <!-- Resting pulse, so the button is noticed without shouting -->
        <span class="animate-pulse-whatsapp pointer-events-none absolute inset-0 rounded-full group-hover:animate-none" aria-hidden="true"></span>

        <Icon icon="tabler:brand-whatsapp" class="relative size-6 shrink-0" />

        <span class="relative hidden max-w-0 overflow-hidden whitespace-nowrap font-medium opacity-0 transition-all duration-500 ease-soft group-hover:ms-2.5 group-hover:max-w-50 group-hover:opacity-100 md:inline-block">
            Chat on WhatsApp
        </span>
    </a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Digits only, wa.me rejects '+' and spaces.
const phone = '919004989199'

const message = "Hi! I found The Feel Good Center online and I'd like to know more about booking a listening session."

const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
</script>
