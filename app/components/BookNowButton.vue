<template>
    <button
        type="button"
        :class="buttonClass"
        @click="open"
        @pointerenter="prefetch"
        @focus="prefetch"
    >
        <Icon v-if="icon" :icon="icon" class="size-5 shrink-0" />
        <span><slot>Book a slot</slot></span>
        <Icon icon="tabler:arrow-right"
              class="size-4 shrink-0 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
    </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CAL_URL, loadCal, openCal } from '~/utils/booking'

const props = withDefaults(defineProps<{
  /** Full Cal.com booking URL. Defaults to the account page listing every session. */
  url?: string
  /** Tailwind classes for the button itself. */
  buttonClass?: string
  /** Leading icon; pass an empty string to omit it. */
  icon?: string
}>(), {
  url: CAL_URL,
  buttonClass: 'btn-primary btn-fill btn-lg group',
  icon: 'tabler:calendar-heart'
})

/**
 * Warm the embed on hover/focus so the overlay opens instantly on click,
 * while visitors who never interact pay nothing for the script.
 */
function prefetch() {
  loadCal().catch(() => { /* click still falls back to a new tab */ })
}

function open() {
  openCal(props.url)
}
</script>
