<template>
  <div class="px-5 sm:px-6 py-3.5 border-b border-default-200/80 bg-white/70 flex items-center justify-between gap-3">
    <!-- Back / Close Button -->
    <div class="shrink-0">
      <button
        v-if="currentStep > 1 && !isSuccess"
        type="button"
        @click="$emit('prev')"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-default-600 hover:text-default-950 transition-colors px-2.5 py-1.5 rounded-xl hover:bg-default-100 border border-default-200/70 shadow-2xs"
        aria-label="Previous step"
      >
        <Icon icon="tabler:arrow-left" class="size-3.5" />
        <span>Back</span>
      </button>

      <button
        v-else
        type="button"
        @click="$emit('close')"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-default-600 hover:text-default-950 transition-colors px-2.5 py-1.5 rounded-xl hover:bg-default-100 border border-default-200/70 shadow-2xs"
        aria-label="Close modal"
      >
        <Icon icon="tabler:x" class="size-3.5" />
        <span>Close</span>
      </button>
    </div>

    <!-- 3-Step Horizontal Progress Bar -->
    <nav aria-label="Booking steps" class="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 flex-1 max-w-lg">
      <div
        v-for="(step, idx) in steps"
        :key="step.number"
        class="flex items-center gap-1.5 sm:gap-2"
      >
        <!-- Step Indicator Pill/Circle -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <div
            :class="[
              'size-6 sm:size-6.5 rounded-full flex items-center justify-center text-[0.7rem] font-bold transition-all duration-300',
              currentStep === step.number
                ? 'bg-[#1E4635] text-white shadow-xs ring-2 ring-[#1E4635]/20'
                : currentStep > step.number || (step.number === 3 && isSuccess)
                  ? 'bg-[#1E4635] text-white'
                  : 'bg-default-200/80 text-default-500'
            ]"
          >
            <Icon
              v-if="currentStep > step.number || (step.number === 3 && isSuccess)"
              icon="tabler:check"
              class="size-3.5 stroke-[2.5]"
            />
            <span v-else>{{ step.number }}</span>
          </div>

          <!-- Step Label (shown on screens >= sm) -->
          <span
            :class="[
              'text-[0.72rem] sm:text-xs font-medium transition-colors whitespace-nowrap hidden md:inline',
              currentStep === step.number
                ? 'text-default-950 font-semibold'
                : currentStep > step.number
                  ? 'text-default-700'
                  : 'text-default-400'
            ]"
          >
            {{ step.title }}
          </span>
        </div>

        <!-- Connecting Line between steps -->
        <div
          v-if="idx < steps.length - 1"
          :class="[
            'h-0.5 w-4 sm:w-8 lg:w-10 rounded-full transition-colors duration-300',
            currentStep > step.number ? 'bg-[#1E4635]' : 'bg-default-200'
          ]"
          aria-hidden="true"
        ></div>
      </div>
    </nav>

    <!-- Right Trust Badge -->
    <div class="hidden sm:flex items-center gap-1.5 text-[0.7rem] text-default-500 shrink-0">
      <Icon icon="tabler:shield-check" class="size-4 text-peach shrink-0" />
      <span>100% Confidential</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  currentStep: number
  isSuccess?: boolean
}>()

defineEmits<{
  prev: []
  close: []
}>()

const steps = [
  { number: 1, title: 'Select session details' },
  { number: 2, title: 'Enter your details' },
  { number: 3, title: 'Complete your booking' }
]
</script>

