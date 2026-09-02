<template>
     <section class="relative size-full min-h-screen flex flex-col items-center justify-center p-5">
        <div class="container">
            <div class="relative z-10 bg-white w-150 mx-auto border border-default-300 rounded overflow-hidden">

                <div class="lg:p-15 p-10 text-center flex flex-col gap-4">
                    <h3 class="h-display lg:text-4xl">Protected Page</h3>

                    <form action="/">
                        <div class="mb-4">
                            <label for="password" class="mb-2 font-medium block">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" class="rounded-lg bg-default-100 h-11.25 py-2 px-5 w-full flex items-center border-transparent focus:border-default-200">
                        </div>

                        <button type="submit" class="w-full py-3.5 px-9 inline-flex items-center justify-center gap-5 rounded-xl bg-primary font-medium text-primary-ink transition-all">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})

usePageTitle('401 Protected Page')

</script>
