<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
        role="dialog"
        aria-modal="true"
        :aria-label="`Book ${activeService?.title || 'Session'}`"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-default-950/50 backdrop-blur-sm" @click="close"></div>

        <!-- 2-Column Modal Card with Top Progress Bar (Zero Scroll) -->
        <div
          ref="panel"
          class="relative w-full max-w-5xl max-h-[96vh] max-md:overflow-y-auto rounded-3xl bg-[#FAF7F2] border border-default-200/90 shadow-[0_24px_70px_-25px_rgba(28,22,20,0.45)] z-10 flex flex-col md:overflow-hidden"
        >
          <!-- ================= TOP: HORIZONTAL PROGRESS BAR ================= -->
          <BookingStepper
            :current-step="currentStep"
            :is-success="isSuccess"
            @prev="prevStep"
            @close="close"
          />

          <!-- ================= MAIN BODY AREA ================= -->
          <div class="flex-1 flex flex-col justify-between">
            <!-- ---------- STEP 1: SESSIONS & DATE/SLOTS (2 COLUMNS) ---------- -->
            <div v-if="currentStep === 1" class="flex-1 flex flex-col justify-between p-4 sm:p-6">
              <div class="grid md:grid-cols-2 gap-5 lg:gap-7 items-start">
                <!-- COLUMN 1: ALL SESSIONS (CARDS - NOT A DROPDOWN) -->
                <div class="space-y-3">
                  <!-- Category Switcher Pill -->
                  <div class="flex items-center gap-1 p-1 rounded-xl bg-default-200/60 w-fit">
                    <button
                      type="button"
                      @click="setCategory('individual')"
                      :class="[
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                        sessionCategory === 'individual'
                          ? 'bg-white text-default-950 shadow-2xs'
                          : 'text-default-600 hover:text-default-950'
                      ]"
                    >
                      <Icon icon="tabler:user" class="size-3.5" />
                      <span>For Individual</span>
                    </button>

                    <button
                      type="button"
                      @click="setCategory('gift')"
                      :class="[
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                        sessionCategory === 'gift'
                          ? 'bg-white text-default-950 shadow-2xs'
                          : 'text-default-600 hover:text-default-950'
                      ]"
                    >
                      <Icon icon="tabler:gift" class="size-3.5 text-peach" />
                      <span>Gift a Session</span>
                    </button>
                  </div>

                  <div class="text-[0.68rem] font-bold tracking-wider uppercase text-default-500">
                    Session Option
                  </div>

                  <!-- Session Cards List -->
                  <div class="space-y-2">
                    <button
                      v-for="svc in displayedServices"
                      :key="svc.id"
                      type="button"
                      @click="selectService(svc.id)"
                      :class="[
                        'w-full text-start p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group relative cursor-pointer',
                        activeServiceId === svc.id
                          ? 'bg-white border-[#E07A5F] shadow-2xs ring-2 ring-[#E07A5F]/20 -translate-y-0.5'
                          : 'bg-white/70 border-default-200/80 hover:border-default-300 hover:bg-white'
                      ]"
                    >
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2 mb-0.5">
                          <span class="font-heading text-xs sm:text-sm font-semibold text-default-950 truncate">
                            {{ svc.title }}
                          </span>
                          <span
                            v-if="svc.badge"
                            class="shrink-0 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-md bg-peach-soft text-peach-ink leading-tight"
                          >
                            {{ svc.badge }}
                          </span>
                        </div>
                        <div class="text-[0.7rem] text-default-500">
                          {{ svc.duration }} &middot; 1 session
                        </div>
                      </div>

                      <div class="shrink-0 text-end">
                        <span
                          :class="[
                            'font-heading text-sm sm:text-base font-bold transition-colors',
                            activeServiceId === svc.id ? 'text-primary' : 'text-default-900'
                          ]"
                        >
                          {{ svc.price }}
                        </span>
                      </div>
                    </button>
                  </div>

                  <!-- Virtual Video Call Mode Badge (In-person removed) -->
                  <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E4635]/10 text-[#1E4635] text-xs font-medium border border-[#1E4635]/20">
                    <Icon icon="tabler:video" class="size-4 shrink-0" />
                    <span class="truncate">Virtual Video Call &middot; Google Meet</span>
                  </div>
                </div>

                <!-- COLUMN 2: DATE AND TIME SLOTS -->
                <div class="bg-white/50 md:bg-transparent rounded-2xl p-2.5 md:p-0 border md:border-0 border-default-200/70">
                  <DateSlotPicker
                    :days="carouselDays"
                    :active-date="activeDate"
                    :slots="daySlots"
                    :selected-slot="selectedSlot"
                    :loading="slotsLoading"
                    @change-date="onDateChange"
                    @select-slot="onSlotSelect"
                  />
                  <p v-if="slotsError" role="alert" class="mt-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900">
                    {{ slotsError }}
                  </p>
                </div>
              </div>

              <!-- Step 1 Bottom Action Bar -->
              <div class="pt-4 border-t border-default-200/80 mt-4 flex items-center justify-between gap-3">
                <div class="text-xs text-default-600 truncate">
                  <span v-if="selectedSlot">
                    Selected: <strong class="text-default-950 font-semibold">{{ activeService.title }}</strong> &middot; <strong class="text-default-950">{{ selectedSlot.label }}</strong> on {{ formatNiceDate(selectedSlot.date) }}
                  </span>
                  <span v-else class="text-amber-700 flex items-center gap-1">
                    <Icon icon="tabler:hand-point-up" class="size-3.5 shrink-0" />
                    <span>Please pick a date and time slot</span>
                  </span>
                </div>

                <button
                  type="button"
                  :disabled="!selectedSlot || slotsLoading"
                  @click="goToStep2"
                  class="btn-primary btn-fill px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <span>Continue</span>
                  <Icon icon="tabler:arrow-right" class="size-4" />
                </button>
              </div>
            </div>

            <!-- ---------- STEP 2: ENTER DETAILS ---------- -->
            <div v-else-if="currentStep === 2" class="flex-1 flex flex-col justify-between p-4 sm:p-6">
              <div class="grid md:grid-cols-12 gap-5 lg:gap-6 items-start">
                <!-- Left summary box (col-span-5) -->
                <div class="md:col-span-5 rounded-2xl bg-white border border-default-200/90 p-4 space-y-3 shadow-xs">
                  <div class="flex items-center justify-between border-b border-default-100 pb-2.5">
                    <div>
                      <h4 class="font-heading text-sm font-semibold text-default-950">{{ activeService?.title }}</h4>
                      <span class="text-[0.72rem] text-default-500">{{ activeService?.duration }}</span>
                    </div>
                    <span class="font-heading text-base font-bold text-primary">{{ activeService?.price }}</span>
                  </div>

                  <div class="space-y-2 text-xs">
                    <div>
                      <span class="text-default-500 block text-[0.68rem] uppercase font-semibold">Date &amp; Time</span>
                      <strong class="text-default-900 font-medium">
                        {{ formatNiceDate(selectedSlot?.date) }} at {{ selectedSlot?.label }}
                      </strong>
                    </div>

                    <div>
                      <span class="text-default-500 block text-[0.68rem] uppercase font-semibold">Mode</span>
                      <strong class="text-default-900 font-medium flex items-center gap-1">
                        <Icon icon="tabler:video" class="size-3.5 text-[#1E4635]" />
                        <span>Google Meet Call</span>
                      </strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="currentStep = 1"
                    class="text-[0.72rem] text-primary hover:underline font-semibold block pt-1"
                  >
                    &larr; Change session or slot
                  </button>
                </div>

                <!-- Right form fields (col-span-7) -->
                <div class="md:col-span-7">
                  <div class="mb-3">
                    <h3 class="h-display text-lg font-medium text-default-950">Enter your details</h3>
                    <p class="text-xs text-default-600">A safe space. Your information is never shared.</p>
                  </div>

                  <form @submit.prevent="goToStep3" class="space-y-3">
                    <div>
                      <label for="bk-name" class="block text-xs font-semibold text-default-700 mb-1">Name *</label>
                      <input
                        id="bk-name"
                        v-model="customer.name"
                        type="text"
                        required
                        placeholder="Your first name is enough"
                        class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all"
                      />
                    </div>

                    <div class="grid sm:grid-cols-2 gap-2.5">
                      <div>
                        <label for="bk-phone" class="block text-xs font-semibold text-default-700 mb-1">Mobile Number (+91) *</label>
                        <input
                          id="bk-phone"
                          v-model="customer.phone"
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label for="bk-email" class="block text-xs font-semibold text-default-700 mb-1">Email Address *</label>
                        <input
                          id="bk-email"
                          v-model="customer.email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div v-if="sessionCategory === 'gift'" class="rounded-xl border border-peach/40 bg-peach-soft/40 p-3 space-y-2.5">
                      <p class="text-xs font-semibold text-default-800 flex items-center gap-1.5">
                        <Icon icon="tabler:gift" class="size-3.5 text-peach" /> Who is this session for?
                      </p>
                      <div class="grid sm:grid-cols-2 gap-2.5">
                        <div>
                          <label for="bk-recipient-name" class="block text-xs font-semibold text-default-700 mb-1">Their name *</label>
                          <input
                            id="bk-recipient-name"
                            v-model="customer.recipientName"
                            type="text"
                            required
                            placeholder="First name is enough"
                            class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all"
                          />
                        </div>
                        <div>
                          <label for="bk-recipient-email" class="block text-xs font-semibold text-default-700 mb-1">Their email *</label>
                          <input
                            id="bk-recipient-email"
                            v-model="customer.recipientEmail"
                            type="email"
                            required
                            placeholder="They receive the video link here"
                            class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all"
                          />
                        </div>
                      </div>
                      <p class="text-[0.68rem] text-default-500">Pick a time that works for them. They can reschedule with Kinjal on WhatsApp if needed.</p>
                    </div>

                    <div>
                      <label for="bk-notes" class="block text-xs font-semibold text-default-700 mb-1">{{ sessionCategory === 'gift' ? 'A message for them, or anything Kinjal should know' : 'What would you like to talk about?' }}</label>
                      <textarea
                        id="bk-notes"
                        v-model="customer.note"
                        rows="2"
                        placeholder="Optional. A sentence is completely fine."
                        class="w-full rounded-xl border border-default-300 bg-white px-3 py-2 text-xs text-default-950 placeholder:text-default-400 focus:border-[#1E4635] focus:ring-2 focus:ring-[#1E4635]/20 transition-all resize-none"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Step 2 Bottom Action Bar -->
              <div class="pt-4 border-t border-default-200/80 mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  @click="currentStep = 1"
                  class="text-xs text-default-500 hover:text-default-950 font-medium transition-colors"
                >
                  &larr; Back to slots
                </button>

                <button
                  type="button"
                  :disabled="!canProceedToStep3"
                  @click="goToStep3"
                  class="btn-primary btn-fill px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <span>Continue to Payment</span>
                  <Icon icon="tabler:arrow-right" class="size-4" />
                </button>
              </div>
            </div>

            <!-- ---------- STEP 3: REVIEW & PAY ---------- -->
            <div v-else-if="currentStep === 3 && !isSuccess" class="flex-1 flex flex-col justify-between p-4 sm:p-6">
              <div class="grid md:grid-cols-12 gap-5 lg:gap-6 items-start">
                <div class="md:col-span-7 space-y-3">
                  <div>
                    <h3 class="h-display text-lg font-medium text-default-950 mb-0.5">Complete your booking</h3>
                    <p class="text-xs text-default-600">Review your details and confirm your slot.</p>
                  </div>

                  <!-- Summary Box -->
                  <div class="rounded-2xl bg-white border border-default-200/90 p-4 space-y-2.5 shadow-xs">
                    <div class="flex items-center justify-between border-b border-default-100 pb-2.5">
                      <div>
                        <h4 class="font-heading text-sm font-semibold text-default-950">{{ activeService?.title }}</h4>
                        <p class="text-[0.72rem] text-default-500">1:1 Virtual Session with Kinjal Shah</p>
                      </div>
                      <span class="font-heading text-base text-primary font-bold">{{ activeService?.price }}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <span class="text-default-500 block text-[0.68rem]">Date &amp; Time</span>
                        <strong class="text-default-900 font-medium">
                          {{ formatNiceDate(selectedSlot?.date) }} &middot; {{ selectedSlot?.label }}
                        </strong>
                      </div>

                      <div>
                        <span class="text-default-500 block text-[0.68rem]">Mode</span>
                        <strong class="text-default-900 font-medium flex items-center gap-1">
                          <Icon icon="tabler:video" class="size-3.5 text-[#1E4635]" />
                          <span>Google Meet Call</span>
                        </strong>
                      </div>

                      <div>
                        <span class="text-default-500 block text-[0.68rem]">{{ sessionCategory === 'gift' ? 'Gift for' : 'Client' }}</span>
                        <strong class="text-default-900 font-medium truncate block">{{ sessionCategory === 'gift' ? customer.recipientName : customer.name }}</strong>
                      </div>

                      <div>
                        <span class="text-default-500 block text-[0.68rem]">Contact</span>
                        <strong class="text-default-900 font-medium truncate block">{{ customer.email }}</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Payment error alert if any -->
                  <div v-if="paymentError" role="alert" class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Icon icon="tabler:alert-triangle" class="size-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <strong>Payment not completed:</strong>
                      <p>{{ paymentError }}</p>
                    </div>
                  </div>
                </div>

                <div class="md:col-span-5 space-y-3">
                  <div class="rounded-2xl bg-white border border-default-200/90 p-4 space-y-3 shadow-xs">
                    <div class="text-xs font-semibold text-default-900">Payment Breakdown</div>
                    <div class="flex items-center justify-between text-xs text-default-600">
                      <span>Session Fee</span>
                      <span>{{ activeService?.price }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs text-default-600">
                      <span>Platform &amp; Taxes</span>
                      <span class="text-emerald-700 font-medium">Included</span>
                    </div>
                    <div class="pt-2 border-t border-default-200 flex items-center justify-between text-sm font-bold text-default-950">
                      <span>Total Payable</span>
                      <span class="text-primary font-heading text-base">{{ activeService?.price }}</span>
                    </div>

                    <button
                      type="button"
                      :disabled="paying"
                      @click="triggerPayment"
                      class="w-full btn-primary btn-fill py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl disabled:opacity-60 disabled:cursor-wait mt-2"
                    >
                      <Icon v-if="paying" icon="tabler:loader-2" class="size-4 animate-spin" />
                      <span>{{ paying ? 'Processing…' : `Pay ${activeService?.price} &amp; Confirm` }}</span>
                    </button>
                  </div>

                  <div class="p-2.5 rounded-xl bg-default-100/70 text-[0.7rem] text-default-600 flex items-center gap-1.5">
                    <Icon icon="tabler:lock" class="size-3.5 text-default-500 shrink-0" />
                    <span>Slot is only locked after payment. If cancelled, the slot stays free.</span>
                  </div>
                </div>
              </div>

              <!-- Step 3 Bottom Action Bar -->
              <div class="pt-4 border-t border-default-200/80 mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  @click="currentStep = 2"
                  class="text-xs text-default-500 hover:text-default-950 font-medium transition-colors"
                >
                  &larr; Back to details
                </button>
              </div>
            </div>

            <!-- ---------- SUCCESS CONFIRMATION ---------- -->
            <div v-else-if="isSuccess" class="flex-1 flex flex-col items-center justify-center text-center p-6 py-8">
              <div class="size-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3.5">
                <Icon icon="tabler:check" class="size-8 stroke-[2.5]" />
              </div>

              <h3 class="h-display text-2xl font-medium text-default-950 mb-1">
                {{ bookingResult?.clash ? 'Payment received' : 'Booking Confirmed!' }}
              </h3>
              <p v-if="bookingResult?.clash" class="text-xs text-default-600 max-w-[42ch] mb-5">
                Thank you, {{ customer.name }}. The time you chose was booked by someone else moments before you paid. Kinjal will message you on WhatsApp shortly to agree a new time. Your payment is safe.
              </p>
              <p v-else class="text-xs text-default-600 max-w-[42ch] mb-5">
                Thank you, {{ customer.name }}. Your session with Kinjal is locked in. We've emailed the confirmation and calendar invite to {{ customer.email }}.
              </p>

              <div class="w-full max-w-sm rounded-2xl bg-white border border-default-200 p-4 text-start space-y-2.5 mb-5 shadow-xs text-xs">
                <div class="flex items-center justify-between border-b border-default-100 pb-2">
                  <span class="text-default-500">Session</span>
                  <strong class="text-default-900">{{ activeService?.title }}</strong>
                </div>

                <div class="flex items-center justify-between border-b border-default-100 pb-2">
                  <span class="text-default-500">Date &amp; Time</span>
                  <strong class="text-default-900">
                    {{ formatNiceDate(selectedSlot?.date) }} at {{ selectedSlot?.label }}
                  </strong>
                </div>

                <div class="flex items-center justify-between border-b border-default-100 pb-2">
                  <span class="text-default-500">Payment ID</span>
                  <span class="font-mono text-default-700">{{ bookingResult?.paymentId }}</span>
                </div>

                <div v-if="bookingResult?.meetingUrl" class="flex items-center justify-between border-b border-default-100 pb-2">
                  <span class="text-default-500">Video Call</span>
                  <a
                    :href="bookingResult.meetingUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    <Icon icon="tabler:video" class="size-3.5 text-emerald-600" />
                    <span>Join Google Meet</span>
                    <Icon icon="tabler:arrow-up-right" class="size-3" />
                  </a>
                </div>

                <!-- Calendar Add Actions -->
                <div class="pt-2.5 space-y-2">
                  <a
                    :href="googleCalendarUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1E4635] text-white font-medium text-xs hover:bg-[#163528] transition-colors shadow-2xs"
                  >
                    <Icon icon="tabler:brand-google" class="size-3.5 shrink-0" />
                    <span>Add to Google Calendar</span>
                    <Icon icon="tabler:arrow-up-right" class="size-3 shrink-0" />
                  </a>

                  <p class="text-[0.68rem] text-default-500 text-center pt-1 leading-normal">
                    Calendar invite &amp; Google Meet link sent to <strong>{{ customer.email }}</strong> and Kinjal's calendar.
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  @click="close"
                  class="btn-primary btn-fill px-6 py-2 text-xs font-semibold rounded-xl"
                >
                  <span>Done</span>
                </button>

                <a
                  :href="whatsappDirectLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline px-4 py-2 text-xs font-medium rounded-xl inline-flex items-center gap-1.5"
                >
                  <Icon icon="tabler:brand-whatsapp" class="size-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import BookingStepper from '~/components/booking/BookingStepper.vue'
import DateSlotPicker, { type DaySummary } from '~/components/booking/DateSlotPicker.vue'
import { serviceData, type ServiceType } from '~/data/sessions'
import type { BookableService, BookingCustomer, ConfirmedBookingResult, SelectedSlot } from '~/types/booking'
import { loadRazorpay, payForSession, PaymentCancelled } from '~/utils/razorpay'

const props = defineProps<{
  open: boolean
  service: BookableService | null
}>()

const emit = defineEmits<{
  close: []
}>()

const currentStep = ref(1)
const isSuccess = ref(false)

const sessionCategory = ref<'individual' | 'gift'>('individual')
const activeServiceId = ref<string>('listening-50')

const displayedServices = computed(() => {
  if (sessionCategory.value === 'gift') {
    return serviceData.filter(s => s.id === 'gift-50')
  }
  return serviceData.filter(s => s.id !== 'gift-50')
})

const activeService = computed(() => {
  return (serviceData.find(s => s.id === activeServiceId.value) || serviceData[1]) as ServiceType
})

const customer = reactive<BookingCustomer>({
  name: '',
  phone: '',
  email: '',
  note: '',
  recipientName: '',
  recipientEmail: ''
})

const activeDate = ref<string>('')
/** First day of the carousel: today. Selecting a day never moves it. */
const windowStart = ref<string>('')
const carouselDays = ref<DaySummary[]>([])
const daySlots = reactive<{
  morning: SelectedSlot[]
  afternoon: SelectedSlot[]
  evening: SelectedSlot[]
  total: number
}>({
  morning: [],
  afternoon: [],
  evening: [],
  total: 0
})
const selectedSlot = ref<SelectedSlot | null>(null)
const slotsLoading = ref(false)
const slotsError = ref('')

const paying = ref(false)
const paymentError = ref('')
const bookingResult = ref<ConfirmedBookingResult | null>(null)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const canProceedToStep3 = computed(() => {
  const base = customer.name.trim().length > 1 &&
    customer.phone.trim().length >= 8 &&
    EMAIL_RE.test(customer.email.trim())
  if (sessionCategory.value !== 'gift') return base
  return base &&
    (customer.recipientName || '').trim().length > 1 &&
    EMAIL_RE.test((customer.recipientEmail || '').trim())
})

const whatsappDirectLink = computed(() => {
  const text = `Hi Kinjal! I've booked the ${activeService.value.title} for ${selectedSlot.value?.label} on ${selectedSlot.value?.date}. (Payment ID: ${bookingResult.value?.paymentId || ''})`
  return `https://wa.me/917400097501?text=${encodeURIComponent(text)}`
})

const googleCalendarUrl = computed(() => {
  if (!selectedSlot.value) return '#'
  try {
    const toUtc = (iso: string) => {
      const d = new Date(iso)
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    const dates = `${toUtc(selectedSlot.value.startIso)}/${toUtc(selectedSlot.value.endIso)}`
    const meetUrl = bookingResult.value?.meetingUrl
    const details = [
      `Confidential 1:1 Listening Session with Kinjal Shah (The Feel Good Centre)`,
      `Client: ${customer.name}`,
      `Payment ID: ${bookingResult.value?.paymentId || ''}`,
      meetUrl ? `Google Meet Link: ${meetUrl}` : ''
    ].filter(Boolean).join('\n')

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Listening Session: ${activeService.value.title} with Kinjal Shah`,
      dates,
      details,
      location: meetUrl || 'Google Meet (Virtual Video Call)'
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  } catch {
    return '#'
  }
})


function setCategory(cat: 'individual' | 'gift') {
  sessionCategory.value = cat
  if (cat === 'gift') {
    selectService('gift-50')
  } else {
    if (activeServiceId.value === 'gift-50') {
      selectService('listening-50')
    }
  }
}

function selectService(svcId: string) {
  if (activeServiceId.value === svcId && selectedSlot.value) return
  activeServiceId.value = svcId
  selectedSlot.value = null
  fetchSlots(activeDate.value, activeService.value.durationMinutes || 50)
}

function onDateChange(newDate: string) {
  activeDate.value = newDate
  selectedSlot.value = null
  fetchSlots(newDate, activeService.value.durationMinutes || 50)
}

function onSlotSelect(slot: SelectedSlot) {
  selectedSlot.value = slot
}

async function fetchSlots(dateStr: string, durationMinutes = 50) {
  slotsLoading.value = true
  slotsError.value = ''
  try {
    const data = await $fetch<{
      activeDate: string
      days: DaySummary[]
      slots: {
        all: SelectedSlot[]
        morning: SelectedSlot[]
        afternoon: SelectedSlot[]
        evening: SelectedSlot[]
        total: number
      }
    }>(`/api/booking/slots`, {
      params: {
        date: dateStr || undefined,
        from: windowStart.value || undefined,
        sessionId: activeService.value.id,
        days: 21
      }
    })

    carouselDays.value = data.days || []
    activeDate.value = data.activeDate
    daySlots.morning = data.slots?.morning || []
    daySlots.afternoon = data.slots?.afternoon || []
    daySlots.evening = data.slots?.evening || []
    daySlots.total = data.slots?.total || 0

    if (daySlots.total === 0 && !selectedSlot.value) {
      const firstAvailable = carouselDays.value.find(d => d.slotCount > 0)
      if (firstAvailable && firstAvailable.date !== activeDate.value) {
        onDateChange(firstAvailable.date)
      }
    }
  } catch (err) {
    console.error('Failed to fetch slots:', err)
    const data = (err as { data?: { statusMessage?: string } })?.data
    slotsError.value = data?.statusMessage || 'We could not load available times. Please try again or book over WhatsApp.'
    carouselDays.value = []
    daySlots.morning = []; daySlots.afternoon = []; daySlots.evening = []; daySlots.total = 0
  } finally {
    slotsLoading.value = false
  }
}

function goToStep2() {
  if (!selectedSlot.value) return
  currentStep.value = 2
}

function goToStep3() {
  if (!canProceedToStep3.value) return
  paymentError.value = ''
  currentStep.value = 3
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function close() {
  if (paying.value) return
  emit('close')
}

async function triggerPayment() {
  if (paying.value || !selectedSlot.value) return
  paymentError.value = ''
  paying.value = true

  try {
    const res = await payForSession(activeService.value.id, {
      name: customer.name.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      note: customer.note?.trim() || '',
      recipientName: sessionCategory.value === 'gift' ? (customer.recipientName || '').trim() : '',
      recipientEmail: sessionCategory.value === 'gift' ? (customer.recipientEmail || '').trim() : '',
      slotStartIso: selectedSlot.value.startIso,
      slotEndIso: selectedSlot.value.endIso,
      slotDate: selectedSlot.value.date,
      slotLabel: selectedSlot.value.label
    })

    bookingResult.value = res
    isSuccess.value = true
  } catch (err) {
    if (!(err instanceof PaymentCancelled)) {
      paymentError.value = (err as Error).message || 'Payment could not be completed. Please try again or reach out on WhatsApp.'
    }
  } finally {
    paying.value = false
  }
}

function formatNiceDate(dStr?: string) {
  if (!dStr) return ''
  try {
    const [y = 0, m = 1, d = 1] = dStr.split('-').map(Number)
    const dt = new Date(y, m - 1, d)
    return dt.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  } catch {
    return dStr
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    currentStep.value = 1
    isSuccess.value = false
    paymentError.value = ''
    selectedSlot.value = null
    paying.value = false
    bookingResult.value = null

    if (props.service) {
      activeServiceId.value = props.service.id
      sessionCategory.value = props.service.id === 'gift-50' ? 'gift' : 'individual'
    } else {
      activeServiceId.value = 'listening-50'
      sessionCategory.value = 'individual'
    }

    const todayIst = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
    windowStart.value = todayIst
    activeDate.value = todayIst
    fetchSlots(todayIst, activeService.value.durationMinutes || 50)
    loadRazorpay().catch(() => {})
  }

  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: translateY(16px) scale(0.99);
}
</style>
