<template>
    <section class="relative size-full overflow-hidden md:py-14.5 py-10">

        <div class="container">
            <div class="mb-15">
                <div class="mb-2.5 text-sm text-default-950">Get in Touch</div>

                <h1 class="lg:text-[56px] md:text-5xl text-4xl text-default-950">We're Here to Listen and Help</h1>
            </div>

            <div class="grid lg:grid-cols-5 lg:gap-17.5 md:gap-12.5 gap-7.5">
                <div class="lg:col-span-3">

                    <div class="mb-10">A safe, judgment free space to talk, express, and feel lighter. Share a few details and we'll get back to you.</div>

                    <form @submit.prevent>
                        <div class="grid md:grid-cols-2 gap-7.5 mb-7.5">
                            <div>
                                <label for="first-name" class="mb-1.5 text-sm block">First Name *</label>
                                <input type="text" id="first-name" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="last-name" class="mb-1.5 text-sm block">Last Name *</label>
                                <input type="text" id="last-name" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="mobile-number" class="mb-1.5 text-sm block">Mobile Number *</label>
                                <input type="tel" id="mobile-number" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="email" class="mb-1.5 text-sm block">Email *</label>
                                <input type="email" id="email" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="age" class="mb-1.5 text-sm block">Age *</label>
                                <input type="number" id="age" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                            </div>

                            <div>
                                <label for="gender" class="mb-1.5 text-sm block">Gender *</label>
                                <select id="gender" name="gender" required class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                                    <option value="">Select one...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-5">
                            <label for="query" class="mb-1.5 text-sm block">Your Query</label>
                            <textarea id="query" class="rounded-lg bg-default-100 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200" rows="8"></textarea>
                        </div>

                        <div class="lg:-mb-14">
                            <button type="submit" class="group py-3.5 px-5 inline-flex items-center justify-center gap-5 rounded-lg bg-primary font-medium text-primary-ink transition-all">
                                <span class="relative block overflow-hidden">
                                    <span class="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Submit
                                    </span>
                                    <span class="absolute top-7 inset-s-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        Submit
                                    </span>
                                </span>
                            </button>
                        </div>
                    </form>

                </div>

                <div class="lg:col-span-2">
                    <div class="size-full rounded-lg overflow-hidden group">
                        <img class="size-full rounded-lg object-cover group-hover:scale-105 transition-all duration-300" src="/images/other/contact-bg.jpg" alt="Image">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
