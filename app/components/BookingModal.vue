<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
                 role="dialog" aria-modal="true" :aria-label="`Book ${service?.title}`">

                <!-- Backdrop -->
                <div class="absolute inset-0 bg-default-950/45 backdrop-blur-sm" @click="close"></div>

                <div ref="panel"
                     class="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream border border-default-200 shadow-[0_40px_100px_-40px_rgb(28_22_20/0.55)]">

                    <button type="button" @click="close" aria-label="Close"
                            class="absolute top-4 end-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/80 text-default-700 transition-colors hover:bg-white hover:text-default-950">
                        <Icon icon="tabler:x" class="size-5" />
                    </button>

                    <!-- Summary of what is being booked -->
                    <div class="flex items-center gap-4 border-b border-default-200 bg-white/60 p-6 pe-16">
                        <img v-if="service?.image" :src="service.image" alt=""
                             class="size-16 shrink-0 rounded-xl object-cover" />
                        <div>
                            <h3 class="h-display text-xl leading-snug">{{ service?.title }}</h3>
                            <p class="mt-1 text-sm text-default-600">
                                <span v-if="service?.duration">{{ service.duration }} &middot; </span>
                                <span class="font-medium text-default-950">{{ service?.price }}</span>
                            </p>
                        </div>
                    </div>

                    <!-- Booking form -->
                    <form class="p-6" @submit.prevent="submit">
                        <div class="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                            <div class="sm:col-span-2">
                                <label for="bk-name" :class="labelClass">Name *</label>
                                <input id="bk-name" v-model="form.name" type="text" required
                                       placeholder="A first name is enough" :class="fieldClass" />
                            </div>

                            <div>
                                <label for="bk-phone" :class="labelClass">Mobile Number *</label>
                                <input id="bk-phone" v-model="form.phone" type="tel" required
                                       placeholder="+91" :class="fieldClass" />
                            </div>

                            <div>
                                <label for="bk-email" :class="labelClass">Email *</label>
                                <input id="bk-email" v-model="form.email" type="email" required
                                       placeholder="you@example.com" :class="fieldClass" />
                            </div>

                            <div class="sm:col-span-2">
                                <label for="bk-note" :class="labelClass">Anything you'd like to say first?</label>
                                <textarea id="bk-note" v-model="form.note" rows="3"
                                          placeholder="Optional. A single line is completely fine."
                                          :class="fieldClass"></textarea>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary btn-fill btn-lg group mt-6 w-full">
                            <span>Continue to pick a time</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                        </button>

                        <div class="mt-3 flex items-center gap-3 text-xs text-default-400">
                            <span class="h-px flex-1 bg-default-200"></span>
                            <span>or</span>
                            <span class="h-px flex-1 bg-default-200"></span>
                        </div>

                        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"
                           class="btn-outline btn-lg mt-3 w-full">
                            <Icon icon="tabler:brand-whatsapp" class="size-5" />
                            <span>Book over WhatsApp</span>
                        </a>

                        <p class="mt-5 text-center text-xs text-default-500">
                            Confidential &middot; You will choose your slot on the next step
                        </p>
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { CALENDLY_URL, openCalendly } from '~/utils/calendly'

import type { BookableService } from '~/types/booking'

const props = defineProps<{ open: boolean, service: BookableService | null }>()
const emit = defineEmits<{ close: [] }>()

const labelClass = 'mb-1.5 block text-sm font-medium text-default-700'

const fieldClass =
  'w-full rounded-lg border border-default-200 bg-white px-3.5 py-2.5 text-sm text-default-950 ' +
  'placeholder:text-default-400 transition-all duration-200 ' +
  'focus:border-pink focus:ring-2 focus:ring-pink/20'

const form = reactive({ name: '', phone: '', email: '', note: '' })

const whatsappLink = computed(() =>
  'https://wa.me/919004989199?text=' +
  encodeURIComponent(`Hi! I'd like to book the ${props.service?.title ?? 'listening session'}.`)
)

function close() {
  emit('close')
}

function submit() {
  // The form collects who they are; Calendly collects when. Hand the details
  // straight over as prefill so nobody types their name twice.
  const url = new URL(props.service?.calendlyUrl || CALENDLY_URL)
  url.searchParams.set('name', form.name)
  url.searchParams.set('email', form.email)

  // Calendly only keeps these if the event has a custom question / SMS
  // reminders switched on. Harmless when it does not.
  if (form.phone) url.searchParams.set('text_reminder_number', form.phone)

  const context = [
    props.service?.title ? `Session: ${props.service.title}` : '',
    form.phone ? `Mobile: ${form.phone}` : '',
    form.note
  ].filter(Boolean).join(' — ')
  if (context) url.searchParams.set('a1', context)

  // Close ours first so the calendar is not stacked on top of a dead modal.
  close()
  openCalendly(url.toString())
}

// Reset between openings, and stop the page scrolling behind the panel.
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    Object.assign(form, { name: '', phone: '', email: '', note: '' })
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active { transition: opacity 0.3s ease; }

.modal-enter-from,
.modal-leave-to { opacity: 0; }

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child { transform: translateY(24px) scale(0.98); }
</style>
