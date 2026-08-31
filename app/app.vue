<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import '~/assets/css/style.css'
import { preline } from './utils/preline'

onMounted(() => {
  preline.init()
})
</script>