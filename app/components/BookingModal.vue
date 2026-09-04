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
                    <form v-if="!sent" class="p-6" @submit.prevent="submit">
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
                                <label for="bk-email" :class="labelClass">Email</label>
                                <input id="bk-email" v-model="form.email" type="email"
                                       placeholder="you@example.com" :class="fieldClass" />
                            </div>

                            <div>
                                <label for="bk-date" :class="labelClass">Preferred date *</label>
                                <input id="bk-date" v-model="form.date" type="date" required
                                       :min="today" :class="fieldClass" />
                            </div>

                            <div>
                                <label for="bk-slot" :class="labelClass">Preferred time *</label>
                                <select id="bk-slot" v-model="form.slot" required :class="fieldClass">
                                    <option value="">Select one...</option>
                                    <option v-for="slot in slots" :key="slot" :value="slot">{{ slot }}</option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="bk-note" :class="labelClass">Anything you'd like to say first?</label>
                                <textarea id="bk-note" v-model="form.note" rows="3"
                                          placeholder="Optional. A single line is completely fine."
                                          :class="fieldClass"></textarea>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary btn-fill btn-lg group mt-6 w-full">
                            <span>Request this session</span>
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
                            Confidential &middot; Nothing is charged until your slot is confirmed
                        </p>
                    </form>

                    <!-- Confirmation -->
                    <div v-else class="p-8 text-center">
                        <div class="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-lagoon-soft text-lagoon">
                            <Icon icon="tabler:check" class="size-7" />
                        </div>
                        <h4 class="h-display text-2xl mb-2">Request received</h4>
                        <p class="text-default-600">
                            Kinjal will confirm your slot personally, usually within a few hours.
                        </p>
                        <button type="button" class="btn-primary btn-fill btn-lg mt-6 w-full" @click="close">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

import type { BookableService } from '~/types/booking'

const props = defineProps<{ open: boolean, service: BookableService | null }>()
const emit = defineEmits<{ close: [] }>()

const labelClass = 'mb-1.5 block text-sm font-medium text-default-700'

const fieldClass =
  'w-full rounded-lg border border-default-200 bg-white px-3.5 py-2.5 text-sm text-default-950 ' +
  'placeholder:text-default-400 transition-all duration-200 ' +
  'focus:border-pink focus:ring-2 focus:ring-pink/20'

const slots = [
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
  'Late evening (8pm – 10pm)'
]

const today = new Date().toISOString().slice(0, 10)

const sent = ref(false)
const form = reactive({ name: '', phone: '', email: '', date: '', slot: '', note: '' })

const whatsappLink = computed(() =>
  'https://wa.me/919004989199?text=' +
  encodeURIComponent(`Hi! I'd like to book the ${props.service?.title ?? 'listening session'}.`)
)

function close() {
  emit('close')
}

function submit() {
  // No backend yet — hand the request to WhatsApp so nothing is lost,
  // and show the confirmation state in place.
  const lines = [
    `Booking request: ${props.service?.title ?? 'Listening session'}`,
    props.service?.price ? `Price: ${props.service.price}` : '',
    `Name: ${form.name}`,
    `Mobile: ${form.phone}`,
    form.email ? `Email: ${form.email}` : '',
    `Preferred: ${form.date}, ${form.slot}`,
    form.note ? `Note: ${form.note}` : ''
  ].filter(Boolean).join('\n')

  window.open('https://wa.me/919004989199?text=' + encodeURIComponent(lines), '_blank', 'noopener')
  sent.value = true
}

// Reset between openings, and stop the page scrolling behind the panel.
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    sent.value = false
    Object.assign(form, { name: '', phone: '', email: '', date: '', slot: '', note: '' })
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
