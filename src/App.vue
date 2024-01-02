<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
    <component :is="route.meta.layout">
        <router-view />
    </component>
</template>
<style lang="scss">
@use './assets/sass/main';
</style>
