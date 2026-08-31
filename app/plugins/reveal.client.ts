/**
 * Scroll reveal.
 *
 * Watches every [data-reveal] element and adds `.is-visible` when it enters the
 * viewport. Elements inside a [data-reveal-group] are staggered automatically,
 * so components only need the attribute — no per-element delay bookkeeping.
 *
 * The hidden state lives behind `html.reveal-ready` (set by an inline head
 * script), so if this never runs the content is simply visible.
 */

const STAGGER_MS = 90
const MAX_STAGGER = 6

export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (reduced.matches) {
    document.documentElement.classList.remove('reveal-ready')
    return
  }

  const seen = new WeakSet<Element>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  )

  const scan = () => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')

    for (const node of nodes) {
      if (seen.has(node)) continue
      seen.add(node)

      // Stagger siblings within a group unless the element sets its own delay.
      if (!node.style.getPropertyValue('--reveal-delay')) {
        const group = node.closest('[data-reveal-group]')
        if (group) {
          const siblings = Array.from(group.querySelectorAll('[data-reveal]'))
          const index = Math.min(siblings.indexOf(node), MAX_STAGGER)
          if (index > 0) {
            node.style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`)
          }
        }
      }

      observer.observe(node)
    }
  }

  // Elements already above the fold on first paint.
  requestAnimationFrame(scan)

  // Re-scan after each navigation, once the new page has rendered.
  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => requestAnimationFrame(scan))
  })

  // Catch anything mounted outside a route change (v-if blocks, lazy sections).
  let pending: ReturnType<typeof setTimeout> | null = null
  new MutationObserver(() => {
    if (pending) clearTimeout(pending)
    pending = setTimeout(scan, 120)
  }).observe(document.body, { childList: true, subtree: true })
})
