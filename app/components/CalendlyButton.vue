<template>
    <button
        type="button"
        :class="buttonClass"
        @click="open"
        @pointerenter="prefetch"
        @focus="prefetch"
    >
        <Icon v-if="icon" :icon="icon" class="size-5 shrink-0" />
        <span><slot>Book a slot on Calendly</slot></span>
        <Icon icon="tabler:arrow-right"
              class="size-4 shrink-0 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
    </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CALENDLY_URL, loadCalendly, openCalendly } from '~/utils/calendly'

const props = withDefaults(defineProps<{
  /** Full Calendly URL. Defaults to the account landing page. */
  url?: string
  /** Tailwind classes for the button itself. */
  buttonClass?: string
  /** Leading icon; pass an empty string to omit it. */
  icon?: string
}>(), {
  url: CALENDLY_URL,
  buttonClass: 'btn-primary btn-fill btn-lg group',
  icon: 'tabler:calendar-heart'
})

/**
 * Warm the widget on hover/focus so the overlay opens instantly on click,
 * while visitors who never interact pay nothing for the script.
 */
function prefetch() {
  loadCalendly().catch(() => { /* click still falls back to a new tab */ })
}

function open() {
  openCalendly(props.url)
}
</script>
