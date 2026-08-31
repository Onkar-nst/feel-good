<template>
  <NuxtLayout>
    <section class="relative overflow-hidden lg:py-36 md:py-28 py-20">

      <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div class="aura animate-drift size-[34rem] -top-40 -start-40 bg-primary-soft/70"></div>
        <div class="aura animate-breathe delay-2 size-80 bottom-0 -end-24 bg-accent-soft/60"></div>
      </div>

      <div class="container relative">
        <div class="mx-auto max-w-[52ch] text-center">

          <div class="eyebrow mb-6">
            <span class="eyebrow-dot"></span>
            {{ isNotFound ? 'Nothing here yet' : 'Something went wrong' }}
          </div>

          <h1 class="h-display lg:text-[110px] md:text-8xl text-7xl leading-none mb-4">
            {{ statusCode }}
          </h1>

          <h2 class="h-display lg:text-3xl text-2xl mb-4">
            {{ isNotFound ? 'Page not found' : 'This page could not load' }}
          </h2>

          <p class="text-default-600 mb-10">
            {{ isNotFound
              ? "This page isn't available right now. It may have moved, or it may not be open just yet."
              : 'Something broke on our side. Please try again in a moment.' }}
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <button type="button" class="btn-primary btn-fill btn-lg group" @click="goHome">
              <span>Back to Home</span>
              <Icon icon="tabler:arrow-right"
                    class="size-5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>

            <NuxtLink to="/contact" class="btn-outline btn-lg group">
              <Icon icon="tabler:message-circle" class="size-5" />
              <span>Talk to us</span>
            </NuxtLink>
          </div>

        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { clearError } from '#app'
import { NuxtLink } from '#components'
import { Icon } from '@iconify/vue'
import { usePageTitle } from '~/composables/usePageTitle'

// Nuxt hands the thrown error to this component.
const props = defineProps<{ error?: { statusCode?: number, statusMessage?: string } }>()

const statusCode = computed(() => props.error?.statusCode ?? 404)
const isNotFound = computed(() => statusCode.value === 404)

usePageTitle('Page not found')

// clearError resets the error state before navigating, so the app recovers
// properly rather than leaving the boundary rendered.
const goHome = () => clearError({ redirect: '/home' })
</script>
