<template>
  <Hero />
  <Expertise />
  <Clients />
  <Journey />
  <CtaSection />
</template>

<script setup lang="ts">
import Hero from './components/Hero.vue';
import Expertise from './components/Expertise.vue';
import Clients from './components/Clients.vue';
import Journey from './components/Journey.vue';
import CtaSection from '~/components/CtaSection.vue';

usePageTitle('About')

</script>
