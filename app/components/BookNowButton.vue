<template>
    <button
        type="button"
        :class="buttonClass || 'btn-primary btn-fill btn-lg group'"
        @click="$emit('click')"
    >
        <Icon v-if="icon !== ''" :icon="icon || 'tabler:calendar-heart'" class="size-5 shrink-0" />
        <span><slot>Book a slot</slot></span>
        <Icon icon="tabler:arrow-right"
              class="size-4 shrink-0 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
    </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  buttonClass?: string
  icon?: string
}>()

defineEmits<{
  click: []
}>()
</script>
