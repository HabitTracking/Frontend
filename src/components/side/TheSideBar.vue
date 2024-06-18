<script setup>
import miniProfile from '@/components/side/profile/miniProfile.vue';
import CurrentEvents from '@/components/side/currentEvents/TheCurrentEvents.vue';
import TheCalender from '@/components/side/calendar/TheCalender.vue';
import moment from 'jalali-moment';
import { ref } from 'vue';

const date = ref(moment().startOf('jDay').unix());

const selectedTime = value => (date.value = value);
</script>

<template>
    <div class="side-bar">
        <miniProfile />
        <TheCalender @select="selectedTime" />
        <CurrentEvents class="side-bar____activity-list" :date="date" />
    </div>
</template>

<style scoped lang="scss">
.side-bar {
    @include mixins.flex(flex-start, center, 48px, column);
    padding: 36px 20px;

    &__activity-list {
        width: 100%;
        @include mixins.flex(flex-start, stretch, 8px, column);
    }
}
</style>
