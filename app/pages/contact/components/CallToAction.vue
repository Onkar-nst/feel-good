<template>
    <section class="pt-6 pb-10 md:pt-7 md:pb-14 lg:pt-8 lg:pb-16">
        <div class="container">

            <div class="lg:mb-12 mb-9 text-center">
                <div class="eyebrow mb-5" data-reveal="soft">Reach Out to Us</div>

                <h2 class="h-display lg:text-4xl md:text-3xl text-2xl mb-3" data-reveal="up">
                    Two ways to start
                </h2>

                <p class="mx-auto lg:max-w-[54ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    Whichever one feels easiest today is the right one. There is no wrong way to reach us.
                </p>
            </div>

            <!-- One panel split by hairlines rather than three separate colour blocks:
                 the channels are one offer, so they read better as one object. -->
            <div class="mx-auto max-w-3xl grid md:grid-cols-2 gap-px overflow-hidden rounded-3xl border border-default-200 bg-default-200/80 shadow-[0_24px_60px_-44px_rgb(28_22_20/0.4)]"
                 data-reveal-group>
                <component
                    :is="channel.href ? 'a' : 'div'"
                    v-for="(channel, idx) in channelData"
                    :key="idx"
                    :href="channel.href"
                    :target="channel.external ? '_blank' : undefined"
                    :rel="channel.external ? 'noopener noreferrer' : undefined"
                    data-reveal="up"
                    class="group relative flex flex-col gap-5 bg-cream lg:p-9 p-7 transition-colors duration-500 ease-soft hover:bg-white"
                >
                    <div :class="['flex size-11 items-center justify-center rounded-2xl transition-transform duration-500 ease-soft group-hover:-rotate-6 group-hover:scale-105', channel.tint]">
                        <Icon :icon="channel.icon" class="size-5.5" />
                    </div>

                    <div>
                        <div class="eyebrow mb-2">{{ channel.label }}</div>
                        <div class="h-display text-xl mb-2 break-words">{{ channel.value }}</div>
                        <p class="text-sm text-default-600">{{ channel.note }}</p>
                    </div>

                    <div v-if="channel.href" class="mt-auto inline-flex items-center gap-2 text-sm font-medium text-default-950">
                        <span class="relative">
                            {{ channel.action }}
                            <span class="absolute -bottom-0.5 start-0 h-px w-full origin-right scale-x-0 bg-pink transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100"></span>
                        </span>
                        <Icon icon="tabler:arrow-narrow-right"
                              class="size-5 transition-transform duration-500 ease-soft group-hover:translate-x-1.5" />
                    </div>
                </component>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

type ChannelType = {
  label: string
  value: string
  note: string
  icon: string
  href?: string
  action?: string
  external?: boolean
  /* Icon chip only. The card itself stays cream, so the accents read as brand
     colour rather than three unrelated blocks of paint. */
  tint: string
}

const channelData: ChannelType[] = [
  {
    label: 'Email',
    value: 'info@thefeelgoodcenter.in',
    note: 'Write as much or as little as you like. Kinjal reads every one.',
    icon: 'tabler:mail',
    href: 'mailto:info@thefeelgoodcenter.in',
    action: 'Send an email',
    tint: 'bg-pink-soft text-pink'
  },
  {
    label: 'WhatsApp',
    value: 'Message us',
    note: 'The quickest way to ask a question before you book.',
    icon: 'tabler:brand-whatsapp',
    href: 'https://wa.me/919004989199',
    action: 'Open WhatsApp',
    external: true,
    tint: 'bg-peach-soft text-peach'
  }
]
</script>
