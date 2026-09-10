<template>
  <!-- Section inventory and order mirror thefeelgoodcenter.in/about, rebuilt in
       this site's design language:
         Hero → About Us → Our Commitment → Our Journey → Our Certificates -->
  <Hero />
  <Founder />
  <Commitment />
  <Journey />
  <Credentials />
</template>

<script setup lang="ts">
import { useHead } from '#unhead/composables'
import { usePageTitle } from '~/composables/usePageTitle'
import Hero from './components/Hero.vue'
import Founder from './components/Founder.vue'
import Commitment from './components/Commitment.vue'
import Journey from './components/Journey.vue'
import Credentials from '~/components/Credentials.vue'

usePageTitle('About')

useHead({
  meta: [
    {
      name: 'description',
      content: 'Welcome to The Feel Good Centre. Meet Kinjal Shah, and read the mission, values, journey and training behind a dedicated space to put down what you have been carrying.'
    }
  ]
})
</script>
