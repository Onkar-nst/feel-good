<template>
    <!--
        Honest credential badge.

        Deliberately NOT styled to imitate a government-issued seal. It states
        only what is verifiable — the business is registered with the MSME
        ministry, and the Udyam number proves it — and links to the real
        certificate so anyone can check. Do not add words like "Qualified",
        "Certified" or "Approved" here: The Feel Good Centre is a listening
        service, not a licensed practice, and the client notes flag that
        boundary as a legal exposure point.
    -->
    <a :href="certificate" target="_blank" rel="noopener noreferrer"
       class="group inline-flex items-center gap-3.5 rounded-2xl border border-lagoon-ink/15 bg-white/70 p-2.5 pe-5 transition-all duration-500 ease-soft hover:border-lagoon-ink/30 hover:bg-white hover:-translate-y-0.5"
       aria-label="Udyam registration UDYAM-MH-18-0458945 — view the certificate">

        <!-- Seal: inline SVG so it stays crisp and costs no extra request -->
        <span class="relative flex size-13 shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" class="absolute inset-0 size-full" aria-hidden="true">
                <circle cx="50" cy="50" r="47" fill="none"
                        class="stroke-lagoon/40" stroke-width="2" />
                <circle cx="50" cy="50" r="40" fill="none"
                        class="stroke-lagoon/70" stroke-width="2"
                        stroke-dasharray="3 5" stroke-linecap="round" />
                <circle cx="50" cy="50" r="33" class="fill-lagoon-soft" />
            </svg>

            <Icon icon="tabler:building-bank"
                  class="relative size-5.5 text-lagoon-ink transition-transform duration-500 ease-soft group-hover:scale-110" />
        </span>

        <span class="leading-tight">
            <span class="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-lagoon-ink/55">
                Registered with
            </span>

            <span class="mt-1 block text-sm font-medium text-lagoon-ink">
                MSME, Government of India
            </span>

            <span class="mt-1 flex items-center gap-1.5 text-xs tabular-nums text-lagoon-ink/70">
                <Icon icon="tabler:rosette-discount-check" class="size-3.5 shrink-0" />
                {{ udyam }}
            </span>
        </span>
    </a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  udyam?: string
  certificate?: string
}>(), {
  udyam: 'UDYAM-MH-18-0458945',
  certificate: '/images/credentials/udyam-registration.png'
})
</script>
