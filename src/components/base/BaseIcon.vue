<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
    path: {
        type: String
    }
});
const Icon = defineAsyncComponent(() =>
    import(/* @vite-ignore */ `../../assets/icons/${props.path}`)
);
</script>

<template>
    <icon />
</template>
