<template>
    <BlogDetails />
    <Blog />
</template>

<script lang="ts" setup>
import Blog from './components/Blog.vue';
import BlogDetails from './components/BlogDetails.vue';

usePageTitle('Blog Details')

</script>
