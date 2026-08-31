<template>
    <Hero :offers="offerData" />
    <Foundation />
    <Services />
    <CtaSection />
</template>

<script lang="ts" setup>
import Hero from './components/Hero.vue';
import Foundation from './components/Foundation.vue';
import Services from './components/Services.vue';
import CtaSection from '~/components/CtaSection.vue';

const offerData: string[] = [
  '1:1 Virtual Listening Sessions',
  'Monthly/Weekly Check In Plans',
  'Gift a Session',
  'Follow Up Sessions',
  'Corporate Plans'
]

usePageTitle('Services')
</script>
