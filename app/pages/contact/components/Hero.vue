<template>
    <section class="relative overflow-hidden pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16">

        <!-- Ambient colour fields, same treatment as the home hero -->
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[34rem] -top-44 -start-40 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-[26rem] top-1/4 -end-32 bg-periwinkle-soft/70"></div>
            <div class="aura animate-breathe delay-1 size-72 bottom-0 start-1/4 bg-pastel-soft/60"></div>
        </div>

        <div class="container relative">

            <div class="grid lg:grid-cols-5 lg:gap-10 gap-8 lg:items-center lg:mb-12 mb-9">

                <div class="lg:col-span-3">
                    <div class="eyebrow mb-5" data-reveal="soft">Get in Touch</div>

                    <h1 class="h-display lg:text-[56px] md:text-5xl text-4xl leading-[1.08] mb-4" data-reveal="up">
                        We're Here to Listen and Help
                    </h1>

                    <p class="text-lg text-default-600 lg:max-w-[46ch]" data-reveal="up" style="--reveal-delay:120ms">
                        A safe, judgment free space to talk, express, and feel lighter.
                        Share a few details and we'll take it from there.
                    </p>
                </div>

                <!-- The form asks for name, age and gender, so the hesitation is right
                     here. This answers it before the first field rather than after. -->
                <aside class="lg:col-span-2 rounded-2xl border border-default-200 bg-white/70 backdrop-blur-sm p-6 shadow-[0_20px_50px_-40px_rgb(28_22_20/0.4)]"
                       data-reveal="up" style="--reveal-delay:240ms">
                    <div class="eyebrow mb-5">Before You Write</div>

                    <ul role="list" class="space-y-4">
                        <li v-for="(item, idx) in assuranceData" :key="idx" class="flex items-start gap-3.5">
                            <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                                <Icon :icon="item.icon" class="size-4.5" />
                            </span>
                            <div>
                                <div class="font-medium text-default-950">{{ item.title }}</div>
                                <p class="text-sm text-default-600">{{ item.note }}</p>
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>

            <div class="grid lg:grid-cols-5 lg:gap-10 gap-8 items-start">

                <!-- ── Form ─────────────────────────────────────────── -->
                <div class="lg:col-span-3 rounded-2xl border border-default-200 bg-white lg:p-8 p-6 shadow-[0_24px_60px_-40px_rgb(28_22_20/0.35)]"
                     data-reveal="up">
                    <form @submit.prevent>
                        <div class="grid md:grid-cols-2 gap-x-5 gap-y-4 mb-4" data-reveal-group>
                            <div class="md:col-span-2" data-reveal="up">
                                <label for="name" :class="labelClass">Name *</label>
                                <input type="text" id="name" required placeholder="Your name" :class="fieldClass">
                            </div>

                            <div data-reveal="up">
                                <label for="mobile-number" :class="labelClass">Mobile Number *</label>
                                <input type="tel" id="mobile-number" required placeholder="+91" :class="fieldClass">
                            </div>

                            <div data-reveal="up">
                                <label for="email" :class="labelClass">Email *</label>
                                <input type="email" id="email" required placeholder="you@example.com" :class="fieldClass">
                            </div>

                            <div data-reveal="up">
                                <label for="age" :class="labelClass">Age *</label>
                                <input type="number" id="age" required placeholder="Your age" :class="fieldClass">
                            </div>

                            <div data-reveal="up">
                                <label for="gender" :class="labelClass">Gender *</label>
                                <select id="gender" name="gender" required :class="fieldClass">
                                    <option value="">Select one...</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-6">
                            <label for="query" :class="labelClass">What would you like to talk about?</label>
                            <textarea id="query" rows="4" placeholder="A sentence is enough. You don't have to explain everything here."
                                      :class="fieldClass"></textarea>
                        </div>

                        <button type="submit" class="btn-primary btn-fill btn-lg group w-full sm:w-auto">
                            <span>Send Message</span>
                            <Icon icon="tabler:arrow-right"
                                  class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                        </button>

                        <p class="mt-5 text-sm text-default-500">
                            Your details stay between you and Kinjal. Nothing is shared with anyone.
                        </p>
                    </form>
                </div>

                <!-- ── Reassurance panel ────────────────────────────── -->
                <div class="lg:col-span-2 relative overflow-hidden rounded-3xl bg-periwinkle grain lg:p-9 p-7"
                     data-reveal="up" style="--reveal-delay:140ms">

                    <div class="absolute inset-0" aria-hidden="true">
                        <div class="aura animate-drift size-72 -top-20 -end-16 bg-white/50"></div>
                        <div class="aura animate-drift delay-2 size-56 -bottom-16 -start-10 bg-primary-soft/50"></div>
                    </div>

                    <div class="relative">
                        <div class="eyebrow mb-5 text-periwinkle-ink/70!">What happens next</div>

                        <ol class="space-y-6 mb-9" data-reveal-group>
                            <li v-for="(step, idx) in stepData" :key="idx" class="flex items-start gap-4" data-reveal="left">
                                <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/75 font-heading text-sm text-periwinkle-ink">
                                    {{ idx + 1 }}
                                </span>
                                <div>
                                    <h3 class="h-display text-periwinkle-ink! text-lg mb-1">{{ step.title }}</h3>
                                    <p class="text-sm text-periwinkle-ink/80">{{ step.body }}</p>
                                </div>
                            </li>
                        </ol>

                        <div class="border-t border-periwinkle-ink/15 pt-7">
                            <p class="text-sm text-periwinkle-ink/80 mb-4">Would you rather just talk now?</p>

                            <div class="flex flex-wrap gap-3">
                                <a href="tel:+919004989199"
                                   class="btn btn-md bg-white text-periwinkle-ink hover:-translate-y-0.5">
                                    <Icon icon="tabler:phone" class="size-4.5" />
                                    <span>Call us</span>
                                </a>

                                <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"
                                   class="btn btn-md border border-periwinkle-ink/25 text-periwinkle-ink hover:bg-white/40 hover:-translate-y-0.5">
                                    <Icon icon="tabler:brand-whatsapp" class="size-4.5" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
type AssuranceType = { icon: string, title: string, note: string }

const assuranceData: AssuranceType[] = [
  {
    icon: 'tabler:lock',
    title: 'Completely confidential',
    note: 'Nothing you share leaves the conversation. Nothing is recorded.'
  },
  {
    icon: 'tabler:user',
    title: 'A first name is enough',
    note: "You never have to tell us more than you're comfortable with."
  },
  {
    icon: 'tabler:heart-handshake',
    title: 'No obligation',
    note: "Asking a question doesn't commit you to booking anything."
  }
]

import { Icon } from '@iconify/vue'

const labelClass = 'mb-1.5 block text-sm font-medium text-default-700'

const fieldClass =
  'w-full rounded-lg border border-default-200 bg-white px-3.5 py-2.5 text-sm text-default-950 ' +
  'placeholder:text-default-400 transition-all duration-200 ' +
  'focus:border-pink focus:ring-2 focus:ring-pink/20'

const stepData = [
  {
    title: 'You send a note',
    body: "However much you want to say. A single line is completely fine."
  },
  {
    title: 'Kinjal reads it herself',
    body: 'Not a team, not a bot. She replies personally, usually within a few hours.'
  },
  {
    title: 'You pick a time',
    body: 'Choose a slot that suits you. Come as you are, camera on or off.'
  }
]

const whatsappLink =
  'https://wa.me/919004989199?text=' +
  encodeURIComponent("Hi! I'd like to know more about booking a listening session.")
</script>
