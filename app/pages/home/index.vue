<template>
  <Hero />
  <MarqueeBand />
  <Services />
  <About />
  <WhyItMatters />
  <WhyChooseUs />
  <Testimonials />
  <ReviewForm />
  <CtaSection />
</template>

<script setup lang="ts">
import { usePageTitle } from '~/composables/usePageTitle'
import Hero from './components/Hero.vue'
import Services from './components/Services.vue'
import About from './components/About.vue'
import WhyItMatters from './components/WhyItMatters.vue'
import WhyChooseUs from './components/WhyChooseUs.vue'
import Testimonials from './components/Testimonials.vue'
import ReviewForm from './components/ReviewForm.vue'
import MarqueeBand from '~/components/MarqueeBand.vue'
import CtaSection from '~/components/CtaSection.vue'

usePageTitle('Home')
</script>
