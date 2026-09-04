<template>
    <section class="pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16 relative overflow-hidden">

        <div class="absolute inset-0 -z-10" aria-hidden="true">
            <div class="aura animate-drift delay-3 size-[26rem] -top-28 -end-24 bg-primary-soft/50"></div>
        </div>

        <div class="container relative">
            <div class="grid lg:grid-cols-5 lg:gap-16 gap-10">

                <!-- ── The story ────────────────────────────────────── -->
                <div class="lg:col-span-3">
                    <div class="eyebrow mb-5" data-reveal="soft">
                        Our Journey
                    </div>

                    <h2 class="h-display lg:text-5xl md:text-4xl text-3xl mb-6" data-reveal="up">
                        The Story Behind <br class="hidden md:block"> The Feel Good Centre
                    </h2>

                    <div class="space-y-4 text-default-600" data-reveal-group>
                        <p class="text-lg text-default-800" data-reveal="up">
                            Founded with the vision of promoting mental health, The Feel Good Centre
                            began as a digital platform catering to those who seek emotional support.
                        </p>

                        <p data-reveal="up">
                            Recognising the challenges people face in expressing their feelings, we
                            focused on creating a space where individuals could openly share, paving
                            the way for future expansions into physical centres.
                        </p>

                        <p data-reveal="up">
                            As we grow, The Feel Good Centre aims to introduce additional spaces for
                            creative expression. Our journey is rooted in our commitment to listen and
                            support, and we look forward to evolving in ways that further enhance our
                            community's mental health.
                        </p>
                    </div>
                </div>

                <!-- ── Where it's headed ────────────────────────────── -->
                <div class="lg:col-span-2">
                    <div class="rounded-2xl border border-default-200 bg-cream p-7 lg:p-8 h-full" data-reveal="up">
                        <h3 class="h-display text-xl mb-7">Where We're Headed</h3>

                        <ol role="list" class="relative space-y-7 ps-8" data-reveal-group>
                            <!-- The thread running through the milestones -->
                            <span class="absolute inset-y-2 start-[7px] w-px bg-default-300" aria-hidden="true"></span>

                            <li v-for="(milestone, idx) in milestoneData" :key="idx"
                                data-reveal="left"
                                class="relative">
                                <span class="absolute -start-8 top-1.5 size-3.5 rounded-full border-2 border-white bg-primary ring-1 ring-default-300" aria-hidden="true"></span>

                                <div class="text-default-950 font-medium mb-1">{{ milestone.title }}</div>
                                <p class="text-sm text-default-600">{{ milestone.description }}</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
type MilestoneType = { title: string, description: string }

const milestoneData: MilestoneType[] = [
  {
    title: 'A digital platform, first',
    description: 'We began online, so that distance would never be the reason someone stayed quiet.'
  },
  {
    title: 'Physical centres, next',
    description: 'Working toward real rooms you can walk into and be heard in.'
  },
  {
    title: 'Room for creative expression',
    description: 'Beyond talking, spaces where feelings can be put into movement, sound and making.'
  }
]
</script>
