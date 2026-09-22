<template>
    <section class="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20">
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[34rem] -top-44 -start-40 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-[26rem] top-1/4 -end-32 bg-peach-soft/70"></div>
        </div>

        <div class="container relative">
            <div class="lg:mb-12 mb-9">
                <div class="eyebrow mb-5" data-reveal="soft">The small print</div>
                <h1 class="h-display lg:text-[64px] md:text-5xl text-[38px] leading-[1.08] mb-4" data-reveal="up">
                    Policies
                </h1>
                <p class="text-lg text-default-600 lg:max-w-[52ch]" data-reveal="up" style="--reveal-delay:120ms">
                    How bookings, payments, cancellations and your information are handled. Written plainly, because you have enough to think about.
                </p>
            </div>

            <div class="grid lg:grid-cols-4 lg:gap-10 gap-8 items-start">
                <!-- Jump links -->
                <nav class="lg:col-span-1 lg:sticky lg:top-28 rounded-2xl border border-default-200 bg-white/70 p-5" aria-label="On this page">
                    <div class="eyebrow mb-3">On this page</div>
                    <ul class="space-y-2">
                        <li v-for="section in sections" :key="section.id">
                            <a :href="`#${section.id}`" class="text-sm text-default-600 transition-colors hover:text-default-950">{{ section.title }}</a>
                        </li>
                    </ul>
                </nav>

                <div class="lg:col-span-3 space-y-10">
                    <article v-for="section in sections" :id="section.id" :key="section.id"
                             class="scroll-mt-28 rounded-2xl border border-default-200 bg-white lg:p-8 p-6" data-reveal="up">
                        <h2 class="h-display lg:text-3xl text-2xl mb-5">{{ section.title }}</h2>
                        <div class="space-y-4 text-default-700">
                            <p v-for="(para, idx) in section.body" :key="idx">{{ para }}</p>
                        </div>
                    </article>

                    <p class="text-sm text-default-500">
                        Last updated {{ updated }}. Questions about any of this? Write to us from the
                        <NuxtLink to="/contact" class="underline underline-offset-4 hover:text-default-950">contact page</NuxtLink>.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
/*
 * Razorpay's live-mode review looks for a refund/cancellation policy, terms
 * and a privacy policy on the site. The wording below uses sensible defaults
 * for a one-to-one listening service. Edit the copy here; the layout and the
 * footer link stay as they are.
 */
import { NuxtLink } from '#components'

usePageTitle('Policies')

const updated = 'September 2026'

const sections = [
  {
    id: 'cancellation-refund',
    title: 'Cancellation and refund policy',
    body: [
      'Sessions are booked and paid for in advance. If you need to move a session, you can reschedule free of charge up to 24 hours before the start time using the link in your booking confirmation, or by messaging us on WhatsApp.',
      'All bookings are non-refundable. Cancellations, including those made with more than 24 hours notice, and sessions you do not join are not refunded, because the time was held for you. Cancellations with less than 24 hours notice cannot be rescheduled either.',
      'If we have to cancel a session for any reason, we will offer you a new time.',
      'Check-in plans are paid upfront for one month at a time. There is no auto-debit or recurring charge; you choose whether to renew at the end of each month. Sessions not used within the month lapse and do not carry over.'
    ]
  },
  {
    id: 'terms',
    title: 'Terms of service',
    body: [
      'The Feel Good Centre offers one-to-one listening sessions. These are supportive conversations, not therapy, counselling, medical care or crisis support, and nothing said in a session should be taken as professional or clinical advice.',
      'If you are in immediate danger or thinking about harming yourself, please contact local emergency services or a crisis helpline right away. Our sessions are not designed for emergencies.',
      'Sessions are held on video call at the time you booked. Please join on time; a session that starts late still ends at the scheduled time. You must be 18 or older to book, or have a parent or guardian book on your behalf.',
      'Prices are shown in Indian rupees and include all applicable charges. Payment is collected securely by Razorpay at the time of booking. We do not see or store your card, UPI or bank details.',
      'We may decline or end a session if a participant is abusive or if the conversation is clearly outside what a listening session can safely hold.'
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    body: [
      'What you share in a session stays in the session. Nothing is recorded, nothing is written up, and nothing is repeated to anyone, unless the law requires it or someone is in immediate danger.',
      'To run a booking we collect your name, email address and mobile number, and any note you choose to leave. These are used to confirm your session, send reminders and reach you if something changes. They are not sold or shared for marketing.',
      'Payments are processed by Razorpay, which handles your payment details under its own privacy policy. We receive only a confirmation that a payment succeeded, along with a payment reference.',
      'Scheduling is handled through our calendar provider, which stores the booking time and the contact details you enter. Form submissions on this website are emailed to us and kept only as long as needed to respond.',
      'You can ask us at any time to see, correct or delete the information we hold about you. Write to us from the contact page and we will respond within a few working days.'
    ]
  }
]
</script>
