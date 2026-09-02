<template>
  <div>
    <div ref="progressEl" class="scroll-progress" aria-hidden="true"></div>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
    <SocialDock />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from '~/layouts/topbar/index.vue'
import Footer from '~/layouts/footer/index.vue'
import SocialDock from '~/components/SocialDock.vue'

const progressEl = ref<HTMLElement | null>(null)
let frame = 0

const update = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    if (!progressEl.value) return
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
    progressEl.value.style.transform = `scaleX(${Math.min(ratio, 1)})`
  })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>
