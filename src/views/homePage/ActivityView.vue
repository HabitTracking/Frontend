<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import ActivityCard from '@/components/homePage/activity/ActivityCard.vue';
import FilterBar from '@/components/side/filterBar/FilterBar.vue';
import EmptyPage from '@/components/homePage/EmptyPage.vue';
import { activityStore } from '@/stores/activityStore';
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const { activities } = storeToRefs(activityStore());

const activityFilterd = ref();
const setFilter = e => (activityFilterd.value = e);

const getActivityList = computed(() =>
    activityFilterd.value ? activityFilterd.value : activities.value
);
</script>

<template>
    <div class="navbar">
        <h5 class="navbar__title">فعالیت ها</h5>
        <FilterBar :list="activities" type="activity" @filter="setFilter" />
    </div>
    <ul v-if="activities?.length > 0" class="container">
        <li v-for="(activity, index) in getActivityList" :key="index" class="container__item">
            <ActivityCard :data="activity" />
        </li>
    </ul>
    <EmptyPage v-else title="فعالیت" />
</template>

<style scoped lang="scss">
.navbar {
    @include mixins.flex(space-between, center, 20px, row, wrap);

    &__header {
        @include mixins.flex(flex-start, center, 8px);
    }
}
.container {
    @include mixins.grid(repeat(3, 33%), auto, 20px);
    @include mixins.screen(large) {
        @include mixins.grid(repeat(3, 33%), auto, 20px);
    }
    @include mixins.screen(med) {
        @include mixins.grid(repeat(2, 50%), auto, 20px);
    }
    @include mixins.screen(small) {
        @include mixins.grid(100%);
    }
    padding-block: 20px;

    &__item {
        margin-block: 10px;
        max-height: 280px;
    }
}
</style>
