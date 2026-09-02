<template>
    <section class="relative size-full overflow-hidden md:py-20 py-12">

        <!-- Ambient colour fields, same slow atmosphere as the home hero. -->
        <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="aura animate-drift size-[38rem] -top-44 -start-48 bg-primary-soft/70"></div>
            <div class="aura animate-drift delay-2 size-[28rem] top-1/4 -end-36 bg-pastel-soft/80"></div>
            <div class="aura animate-breathe delay-1 size-72 -bottom-16 start-1/3 bg-cream-deep"></div>
        </div>

        <div class="container relative">

            <div class="text-center">
                <div class="eyebrow mb-6" data-reveal="soft">
                    Find Your Voice, Feel Better
                </div>

                <h1 class="h-display lg:text-[64px] md:text-5xl text-[38px] leading-[1.08] mb-6">
                    <span class="block" data-reveal="up" style="--reveal-delay:80ms">A Quiet Space</span>
                    <span class="block relative w-fit mx-auto" data-reveal="up" style="--reveal-delay:200ms">
                        In A Noisy World
                        <!-- Hand-drawn stroke that draws itself once the line lands -->
                        <svg class="underline-stroke absolute -bottom-2 start-0 w-full h-3.5 text-pink/45 overflow-visible"
                             viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden="true">
                            <path d="M2 9.5C48 4 106 2.5 160 4.5c42 1.6 92 5 138 2"
                                  stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                        </svg>
                    </span>
                </h1>

                <p class="text-lg text-default-600 mx-auto lg:max-w-[60ch]" data-reveal="up" style="--reveal-delay:320ms">
                    A dedicated space to put down what you've been carrying. One session.
                    One conversation. One step toward feeling lighter.
                </p>
            </div>

        </div>
    </section>
</template>
