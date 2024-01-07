<script setup>
import { activityStore } from '@/stores/activityStore';
import ActivityCard from './ActivityCard.vue';
import { storeToRefs } from 'pinia';
const { activities } = storeToRefs(activityStore());
</script>

<template>
    <div class="header">
        <h6 class="header__title">فعالیت ها</h6>
    </div>

    <ul class="list">
        <li v-for="index in 3" :key="index" class="list__card">
            <ActivityCard v-if="activities?.[index - 1]" :data="activities?.[index - 1]" />
            <div v-else class="list__card--empty"></div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.header {
    width: 100%;
    margin-bottom: 20px;
}
.list {
    @include mixins.flex(space-between, center, 20px);

    &__card {
        min-height: 280px;

        &--empty {
            @include mixins.base-card;
        }
    }
}
</style>
