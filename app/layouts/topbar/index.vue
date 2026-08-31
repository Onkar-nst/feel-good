<template>
  <!-- Navbar -->
  <header class="sticky top-0 z-50 bg-body-bg transition-all duration-300">
    <div class="container">
      <div class="nav-sticky navbar md:py-6.5 py-5 flex items-center w-full justify-between">
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/logo-fgc.png" class="h-11 md:h-12.5 w-auto flex" alt="The Feel Good Center" />
        </NuxtLink>

        <div id="navbar" class="mx-auto hidden lg:flex items-center justify-center">
          <template v-for="(item, idx) in menuItemData" :key="idx">
            <!-- Simple link -->
            <NuxtLink
              v-if="!item.children"
              :to="item.to!"
              exact-active-class="active"
              class="group flex items-center p-2.5 font-medium text-default-600 transition-all duration-300 hover:text-pink hover:decoration-current underline decoration-transparent underline-offset-3 [&.active]:text-pink [&.active]:decoration-current"
            >
              {{ item.name }}
              <Icon icon="tabler:arrow-up-right" class="ms-1.25 flex size-4 scale-0 text-pink transition-all duration-300 group-hover:scale-100 group-[.active]:scale-100"></Icon>
            </NuxtLink>

            <!-- Link with dropdown -->
            <div v-else class="hs-dropdown relative inline-flex [--trigger:hover]">
              <button type="button" class="hs-dropdown-toggle group flex items-center p-2.5 font-medium text-default-600 transition-all duration-300 hover:text-pink hover:decoration-current underline decoration-transparent underline-offset-3" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                {{ item.name }}
                <Icon icon="tabler:chevron-down" class="ms-3"></Icon>
              </button>

              <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 top-2.5! hidden w-60 rounded-xl border border-default-100 bg-linear-to-b from-default-100/90 to-default-100 p-1 opacity-0 transition-[opacity,margin] duration-300 before:absolute before:inset-s-0 before:-top-6 before:h-6 before:w-full after:absolute after:inset-s-0 after:-bottom-6 after:h-6 after:w-full" role="menu" aria-orientation="vertical">
                <div class="p-2.5 rounded-lg border border-default-200 bg-white">
                  <div class="space-y-1">
                    <NuxtLink
                      v-for="(subItem, subIdx) in item.children"
                      :key="subIdx"
                      :to="subItem.to!"
                      exact-active-class="active"
                      class="block rounded-sm px-3 py-2 text-sm font-semibold text-default-600 hover:bg-primary/6 hover:text-pink [&.active]:bg-primary/6 [&.active]:text-pink"
                    >
                      {{ subItem.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="flex items-center justify-end gap-4">
          <div class="md:flex items-center hidden">
            <NuxtLink to="/contact" class="group py-2.5 px-4.5 inline-flex items-center justify-center gap-5 rounded-lg bg-primary font-medium text-primary-ink transition-all">
              <span class="relative block overflow-hidden">
                <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Book a Session
                </span>
                <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  Book a Session
                </span>
              </span>
            </NuxtLink>
          </div>

          <div class="flex items-center lg:hidden">
            <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-menu" data-hs-overlay="#mobile-menu" class="inline-flex size-10 items-center justify-center rounded-md bg-primary text-primary-ink font-medium transition-all">
              <Icon icon="tabler:align-right" class="size-6"></Icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="hs-overlay hs-overlay-open:translate-y-0 hs-overlay-open:opacity-100 opacity-0 hs-overlay-open:top-auto [--body-scroll:true] [--overlay-backdrop:false] fixed inset-x-0 top-0 z-40 h-100 -translate-y-full transform transition-all duration-500 lg:hidden" role="dialog" tabindex="-1" aria-labelledby="mobile-menu-label">
      <div class="container">
        <div class="bg-body-bg shadow border border-default-200 rounded-lg mb-4">
          <div class="flex max-h-100 flex-col gap-1 divide-y divide-default-200 overflow-y-auto">
            <template v-for="(item, idx) in menuItemData" :key="idx">
              <NuxtLink
                v-if="!item.children"
                :to="item.to!"
                exact-active-class="active"
                class="group flex items-center p-2.5 font-medium text-default-600 transition-all duration-300 hover:text-pink hover:decoration-current underline decoration-transparent underline-offset-3 [&.active]:text-pink [&.active]:decoration-current"
              >
                {{ item.name }}
                <Icon icon="tabler:arrow-up-right" class="ms-1.25 flex size-4 scale-0 text-pink transition-all duration-300 group-hover:scale-100 group-[.active]:scale-100"></Icon>
              </NuxtLink>

              <div v-else class="hs-accordion">
                <button type="button" class="hs-accordion-toggle group flex items-center p-2.5 font-medium text-default-600 transition-all duration-300 hover:text-pink hover:decoration-current underline decoration-transparent underline-offset-3" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  {{ item.name }}
                  <Icon icon="tabler:chevron-down" class="transition-all hs-accordion-active:rotate-180 ms-4"></Icon>
                </button>

                <div class="hs-accordion-content hidden w-full overflow-hidden ps-5 pb-4 transition-[height]">
                  <div class="space-y-1">
                    <NuxtLink
                      v-for="(subItem, subIdx) in item.children"
                      :key="subIdx"
                      :to="subItem.to!"
                      exact-active-class="active"
                      class="block rounded-sm px-3 py-2 text-sm font-semibold text-default-600 hover:bg-primary/6 hover:text-pink [&.active]:bg-primary/6 [&.active]:text-pink"
                    >
                      {{ subItem.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NuxtLink } from '#components'
import { useRoute } from '#app'
import { watch } from 'vue'

type MenuItemType = {
  name: string
  to?: string
  children?: MenuItemType[]
}

const menuItemData: MenuItemType[] = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  {
    name: 'Services',
    children: [
      { name: 'All Services', to: '/service-detail' },
      { name: 'Personal Listening Service', to: '/service-detail/personal' },
      { name: 'Corporate Services', to: '/service-detail/corporate' }
    ]
  },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' }
]

const route = useRoute()

watch(() => route.fullPath, () => {
  if (typeof window !== 'undefined' && window.HSOverlay) {
    window.HSOverlay.close('#mobile-menu')
  }
})
</script>
