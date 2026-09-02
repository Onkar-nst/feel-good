<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 bg-cream">
        <div class="container">

            <div class="lg:mb-14 mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Our Certificates
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl" data-reveal="up">
                        The Training Behind the Listening
                    </h2>
                </div>

                <p class="lg:max-w-[42ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Kinjal is a listener, not a therapist. These certifications aren't a licence to
                    treat anyone. They are simply the training that shaped how she holds a conversation.
                </p>
            </div>

            <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5" data-reveal-group>
                <figure
                    v-for="(credential, idx) in credentialData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift group relative overflow-hidden rounded-2xl border border-default-200/70 bg-white flex flex-col hover:border-primary/30"
                >
                    <div class="overflow-hidden bg-default-100">
                        <img :src="credential.image" :alt="`${credential.title}, awarded to Kinjal Shah`"
                             loading="lazy"
                             class="h-56 w-full object-cover object-top transition-transform duration-[1.4s] ease-soft group-hover:scale-105">
                    </div>

                    <figcaption class="flex flex-1 flex-col gap-3 p-6">
                        <div>
                            <h3 class="mb-1.5 text-lg h-display leading-snug">{{ credential.title }}</h3>
                            <p class="text-sm text-default-600">{{ credential.detail }}</p>
                        </div>

                        <div class="mt-auto pt-3 border-t border-default-200 text-xs text-default-500">
                            {{ credential.issuer }} &middot; {{ credential.year }}
                        </div>
                    </figcaption>
                </figure>
            </div>

            <!-- Registration. Shown as text rather than the certificate scan, which
                 carries a personal address and mobile number. -->
            <div class="mt-5 rounded-2xl border border-default-200/70 bg-white p-7 lg:p-9 flex flex-wrap items-center justify-between gap-6"
                 data-reveal="up">
                <div class="flex items-start gap-4">
                    <span class="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                        <Icon icon="tabler:building-bank" class="size-5.5" />
                    </span>

                    <div>
                        <h3 class="mb-1 text-lg h-display">A Registered Indian Business</h3>
                        <p class="text-default-600">
                            The Feel Good Center is registered with the Ministry of Micro, Small and
                            Medium Enterprises, Government of India.
                        </p>
                    </div>
                </div>

                <div class="rounded-xl bg-cream px-5 py-3">
                    <div class="text-xs text-default-500 mb-0.5">Udyam Registration Number</div>
                    <div class="font-medium text-default-950 tabular-nums">UDYAM-MH-18-0458945</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

type CredentialType = {
  image: string
  title: string
  detail: string
  issuer: string
  year: string
}

const credentialData: CredentialType[] = [
  {
    image: '/images/credentials/diploma-integrative-counselling.jpg',
    title: 'Diploma in Integrative Counselling',
    detail: '150 hours of training in counselling skills, theory and practice across three models.',
    issuer: 'Heart to Heart Counselling Centre, India',
    year: '2021'
  },
  {
    image: '/images/credentials/certificate-personal-counselling.jpg',
    title: 'Certificate in Personal Counselling',
    detail: "Training based on Robert Carkhuff's Model of Counselling.",
    issuer: 'Institute of Human Technology',
    year: '2020'
  },
  {
    image: '/images/credentials/certificate-transactional-analysis.jpg',
    title: 'Certificate in Applied Transactional Analysis',
    detail: 'Understanding the patterns underneath how people speak to one another.',
    issuer: 'Institute of Human Technology',
    year: '2020'
  },
  {
    image: '/images/credentials/certificate-rebt.jpg',
    title: 'Certificate in Counselling',
    detail: 'Advanced training in Rational Emotive Behavior Therapy.',
    issuer: 'Institute of Human Technology',
    year: '2021'
  }
]
</script>
