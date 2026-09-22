<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h3 class="h-display text-lg md:text-xl font-medium text-default-950">Date and Time</h3>
      <span class="flex size-9 items-center justify-center rounded-xl bg-peach-soft/60 text-peach">
        <Icon icon="tabler:calendar-month" class="size-5" />
      </span>
    </div>

    <!-- Date Strip / Carousel -->
    <div class="relative mb-6">
      <div class="flex items-center gap-2">
        <!-- Prev Button -->
        <button
          type="button"
          @click="shiftDays(-1)"
          :disabled="dayOffset <= 0 || loading"
          class="flex size-8 md:size-9 items-center justify-center shrink-0 rounded-full border border-default-200 bg-white text-default-700 transition-all hover:bg-default-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
          aria-label="Previous days"
        >
          <Icon icon="tabler:chevron-left" class="size-4" />
        </button>

        <!-- Days list -->
        <div class="flex-1 grid grid-cols-4 gap-2 overflow-hidden">
          <button
            v-for="day in visibleDays"
            :key="day.date"
            type="button"
            @click="selectDay(day.date)"
            :class="[
              'flex flex-col items-center justify-center py-2.5 px-1.5 rounded-2xl border text-center transition-all duration-300',
              activeDate === day.date
                ? 'bg-[#1E4635] text-white border-[#1E4635] shadow-md -translate-y-0.5'
                : day.isAvailable
                  ? 'bg-white border-default-200 text-default-800 hover:border-primary/50 hover:bg-cream/50'
                  : 'bg-default-100/70 border-default-100 text-default-400 cursor-not-allowed opacity-60'
            ]"
          >
            <span
              :class="[
                'text-[0.68rem] font-bold tracking-wider uppercase mb-0.5',
                activeDate === day.date ? 'text-white/80' : 'text-default-500'
              ]"
            >
              {{ day.dayName }}
            </span>

            <span class="text-xs md:text-sm font-semibold mb-0.5 whitespace-nowrap">
              {{ day.dayNum }} {{ day.month }}
            </span>

            <span
              :class="[
                'text-[0.62rem] font-medium px-1.5 py-0.5 rounded-full mt-0.5 leading-none',
                activeDate === day.date
                  ? 'bg-white/20 text-white'
                  : day.slotCount > 0
                    ? 'bg-peach-soft text-peach-ink'
                    : 'text-default-400'
              ]"
            >
              {{ day.slotCount > 0 ? `${day.slotCount} slots` : 'no slots' }}
            </span>
          </button>
        </div>

        <!-- Next Button -->
        <button
          type="button"
          @click="shiftDays(1)"
          :disabled="dayOffset >= maxOffset || loading"
          class="flex size-8 md:size-9 items-center justify-center shrink-0 rounded-full border border-default-200 bg-white text-default-700 transition-all hover:bg-default-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
          aria-label="Next days"
        >
          <Icon icon="tabler:chevron-right" class="size-4" />
        </button>
      </div>
    </div>

    <!-- Slots Section -->
    <div v-if="loading" class="py-12 flex flex-col items-center justify-center text-default-500 gap-2">
      <Icon icon="tabler:loader-2" class="size-6 animate-spin text-primary" />
      <span class="text-xs">Checking real-time availability…</span>
    </div>

    <div v-else-if="slots.total === 0" class="py-8 text-center bg-cream/70 rounded-2xl border border-default-200/70 p-6">
      <Icon icon="tabler:calendar-off" class="size-8 mx-auto text-default-400 mb-2" />
      <p class="text-sm font-medium text-default-800 mb-1">No open slots on this date</p>
      <p class="text-xs text-default-500">Please choose another day from the calendar above.</p>
    </div>

    <div v-else class="space-y-3">
      <!-- Morning Slots -->
      <div v-if="slots.morning && slots.morning.length > 0">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-default-600 mb-1.5">
          <Icon icon="tabler:sunrise" class="size-4 text-amber-600" />
          <span>Morning</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <button
            v-for="slot in slots.morning"
            :key="slot.time"
            type="button"
            @click="$emit('select-slot', slot)"
            :class="[
              'py-2 px-2 rounded-xl text-xs font-medium border transition-all duration-200 text-center',
              selectedSlot?.startIso === slot.startIso
                ? 'bg-[#1E4635] text-white border-[#1E4635] shadow-xs ring-2 ring-[#1E4635]/20 font-semibold'
                : 'bg-white border-default-200 text-default-800 hover:border-[#1E4635]/40 hover:bg-cream/60'
            ]"
          >
            {{ slot.label }}
          </button>
        </div>
      </div>

      <!-- Afternoon Slots -->
      <div v-if="slots.afternoon && slots.afternoon.length > 0">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-default-600 mb-1.5">
          <Icon icon="tabler:sun" class="size-4 text-amber-500" />
          <span>Afternoon</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <button
            v-for="slot in slots.afternoon"
            :key="slot.time"
            type="button"
            @click="$emit('select-slot', slot)"
            :class="[
              'py-2 px-2 rounded-xl text-xs font-medium border transition-all duration-200 text-center',
              selectedSlot?.startIso === slot.startIso
                ? 'bg-[#1E4635] text-white border-[#1E4635] shadow-xs ring-2 ring-[#1E4635]/20 font-semibold'
                : 'bg-white border-default-200 text-default-800 hover:border-[#1E4635]/40 hover:bg-cream/60'
            ]"
          >
            {{ slot.label }}
          </button>
        </div>
      </div>

      <!-- Evening Slots -->
      <div v-if="slots.evening && slots.evening.length > 0">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-default-600 mb-1.5">
          <Icon icon="tabler:moon-stars" class="size-4 text-indigo-500" />
          <span>Evening</span>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <button
            v-for="slot in slots.evening"
            :key="slot.time"
            type="button"
            @click="$emit('select-slot', slot)"
            :class="[
              'py-2 px-2 rounded-xl text-xs font-medium border transition-all duration-200 text-center',
              selectedSlot?.startIso === slot.startIso
                ? 'bg-[#1E4635] text-white border-[#1E4635] shadow-xs ring-2 ring-[#1E4635]/20 font-semibold'
                : 'bg-white border-default-200 text-default-800 hover:border-[#1E4635]/40 hover:bg-cream/60'
            ]"
          >
            {{ slot.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { SelectedSlot } from '~/types/booking'

export type DaySummary = {
  date: string
  dayName: string
  dayNum: string
  month: string
  slotCount: number
  isAvailable: boolean
  isToday: boolean
}

const props = defineProps<{
  days: DaySummary[]
  activeDate: string
  slots: {
    morning?: SelectedSlot[]
    afternoon?: SelectedSlot[]
    evening?: SelectedSlot[]
    total: number
  }
  selectedSlot: SelectedSlot | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'change-date': [date: string]
  'select-slot': [slot: SelectedSlot]
}>()

const dayOffset = ref(0)
const VISIBLE_COUNT = 4

const maxOffset = computed(() => Math.max(0, (props.days?.length || 0) - VISIBLE_COUNT))

const visibleDays = computed(() => {
  if (!props.days) return []
  return props.days.slice(dayOffset.value, dayOffset.value + VISIBLE_COUNT)
})

function shiftDays(dir: number) {
  const next = dayOffset.value + dir
  if (next >= 0 && next <= maxOffset.value) {
    dayOffset.value = next
  }
}

function selectDay(date: string) {
  emit('change-date', date)
}

// Auto scroll visible window if activeDate is outside the 4 days
watch(() => props.activeDate, (newDate) => {
  if (!props.days) return
  const idx = props.days.findIndex(d => d.date === newDate)
  if (idx !== -1) {
    if (idx < dayOffset.value) {
      dayOffset.value = idx
    } else if (idx >= dayOffset.value + VISIBLE_COUNT) {
      dayOffset.value = Math.min(maxOffset.value, idx - VISIBLE_COUNT + 1)
    }
  }
})
</script>
