<script setup>
// import ShowReport from '@/components/homePage/TheReport.vue';
import activityReminder from '@/components/homePage/activity/activityReminder.vue';
import ActivityType from '@/components/homePage/activityType/ActivityType.vue';

const homecomponents = [activityReminder, ActivityType];
</script>

<template>
    <div class="home">
        <section v-for="component in homecomponents" :key="component">
            <component :is="component"></component>
            <hr class="home__line" v-if="component.__name == 'ShowReport'" />
        </section>
    </div>
</template>
<style scoped lang="scss">
.home {
    @include mixins.flex(flex-start, auto, 56px, column);

    &__line {
        margin-top: 48px;
        border: 2px solid variables.$bgLightSurface;
    }
}
</style>
