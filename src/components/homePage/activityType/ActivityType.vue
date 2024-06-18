<script setup>
import { storeToRefs } from 'pinia';
import { activityTypeStore } from '../../../stores/activityTypeStore';
import ActivityTypecard from './ActivityTypecard.vue';

const { activityTypes } = storeToRefs(activityTypeStore());
</script>

<template>
    <div class="header">
        <h6>نوع فعالیت</h6>
    </div>
    <ul class="list">
        <li v-for="(data, index) in activityTypes" :key="index" class="list__card">
            <ActivityTypecard :data="data" />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.header {
    margin-bottom: 16px;
}
.list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 8px;
    &__card {
        min-height: 110px;

        & {
            @include mixins.base-card;
        }
    }
}
</style>
