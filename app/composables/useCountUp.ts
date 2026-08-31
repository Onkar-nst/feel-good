import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

/**
 * Counts a number up from zero the first time its element scrolls into view.
 * Falls back to the final value immediately when motion is reduced.
 *
 *   const { el, value } = useCountUp(2200)
 *   <span ref="el">{{ value }}+</span>
 */
export function useCountUp(target: number, duration = 1800) {
  const el = ref<HTMLElement | null>(null)
  const value: Ref<number> = ref(0)

  let observer: IntersectionObserver | null = null
  let frame = 0

  const run = () => {
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast at first, settles gently rather than stopping dead
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      value.value = Math.round(target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      value.value = target
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer?.disconnect()
        run()
      },
      { threshold: 0.4 }
    )

    if (el.value) observer.observe(el.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
  })

  return { el, value }
}
