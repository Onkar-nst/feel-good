<template>
    <Hero />
    <CallToAction />
    <CtaSection />
</template>

<script lang="ts" setup>

import Hero from './components/Hero.vue'
import CallToAction from './components/CallToAction.vue';
import CtaSection from '~/components/CtaSection.vue';

usePageTitle('Contact Us')

</script>
