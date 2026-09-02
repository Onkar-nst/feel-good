<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 relative bg-cream overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift size-[30rem] -top-36 -start-32 bg-primary-soft/60"></div>
            <div class="aura animate-drift delay-2 size-80 -bottom-24 -end-16 bg-pastel-soft/70"></div>
        </div>

        <div class="container relative">

            <div class="text-center lg:mb-14 mb-10">
                <div class="eyebrow mb-5" data-reveal="soft">
                    Who We're Here For
                </div>

                <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-4" data-reveal="up">
                    You look completely fine from the outside
                </h2>

                <p class="mx-auto lg:max-w-[58ch] text-default-600" data-reveal="up" style="--reveal-delay:120ms">
                    That's usually the hardest part. If one of these sounds like your week,
                    you're exactly who this space was built for.
                </p>
            </div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4" data-reveal-group>
                <div
                    v-for="(person, idx) in personData"
                    :key="idx"
                    data-reveal="up"
                    class="card-lift card-wash group relative overflow-hidden bg-white rounded-2xl p-6 flex flex-col gap-5 border border-default-200/70 hover:border-primary/30"
                >
                    <span class="relative flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-ink transition-transform duration-500 ease-soft group-hover:scale-110">
                        <Icon :icon="person.icon" class="size-5.5" />
                    </span>

                    <div class="relative mt-auto">
                        <h3 class="mb-1.5 text-lg h-display leading-snug">{{ person.title }}</h3>
                        <p class="text-sm text-default-600">{{ person.description }}</p>
                    </div>
                </div>
            </div>

            <!-- The point of the whole section, said plainly. -->
            <div class="mt-10 mx-auto lg:max-w-[62ch] rounded-2xl bg-white border border-pastel/45 p-7 text-center"
                 data-reveal="up">
                <p class="text-lg text-default-950">
                    None of this is an emergency. That is exactly the point &mdash;
                    you shouldn't have to wait until it becomes one.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

type PersonType = {
  icon: string
  title: string
  description: string
}

// Drawn from the client's target-customer brief: the person who looks fine
// from the outside but doesn't feel fine inside.
const personData: PersonType[] = [
  {
    icon: 'tabler:shield-heart',
    title: "You're always the strong one",
    description: "Everyone leans on you. Nobody thinks to ask how you're holding up, because you always seem to be."
  },
  {
    icon: 'tabler:briefcase',
    title: 'Work follows you home',
    description: "The pressure doesn't stop at logging off, and \"how was your day?\" never quite covers it."
  },
  {
    icon: 'tabler:users-group',
    title: "You can't say it at home",
    description: 'Expectations you never agreed to, and a lot you have learned it is easier not to bring up.'
  },
  {
    icon: 'tabler:plane-departure',
    title: "You're far from home",
    description: 'You built a life somewhere new. Most days that feels right. Some days the distance sits heavy.'
  },
  {
    icon: 'tabler:compass',
    title: "You're between chapters",
    description: 'A career, a relationship, a direction. You are not lost exactly, just genuinely unsure.'
  },
  {
    icon: 'tabler:message-circle-heart',
    title: 'Surrounded, and still alone',
    description: "You have people. There is just nothing you feel entirely safe telling any of them."
  }
]
</script>
