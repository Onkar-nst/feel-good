<template>
  <!-- Order follows the client's recommended structure:
       Home → How TFGC Helps → Services → For Organisations → Resources.
       The 'Meet Kinjal' block (./components/About.vue) is hidden for now: the file
       is intact, so restoring it is one import plus one <About /> back in place.
       The supporting blocks (Why It Matters, Why Choose Us, Testimonials, Review
       Form) sit between those beats rather than interrupting the spine. -->
  <Hero />
  <MarqueeBand />
  <HowWeHelp />
  <WhyItMatters />
  <Services />
  <WhyChooseUs />
  <ForOrganisations />
  <Testimonials />
  <Resources />
  <ReviewForm />
  <CtaSection />
</template>

<script setup lang="ts">
import { usePageTitle } from '~/composables/usePageTitle'
import Hero from './components/Hero.vue'
import HowWeHelp from './components/HowWeHelp.vue'
import WhyItMatters from './components/WhyItMatters.vue'
import Services from './components/Services.vue'
import WhyChooseUs from './components/WhyChooseUs.vue'
import ForOrganisations from './components/ForOrganisations.vue'
import Testimonials from './components/Testimonials.vue'
import Resources from './components/Resources.vue'
import ReviewForm from './components/ReviewForm.vue'
import MarqueeBand from '~/components/MarqueeBand.vue'
import CtaSection from '~/components/CtaSection.vue'

usePageTitle('Home')
</script>
