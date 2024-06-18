<script setup>
import { computed, watch, ref } from 'vue';
import CurrentEventCard from './CurrentEventCard.vue';
import { getcalendarDay } from '../../../services/activityService'
import Activity from '../../homePage/activity/Activity';
import moment from 'jalali-moment';

const props = defineProps({
    date: {
        type: Number
    }
})

const activityList = ref([]);


watch(() => props.date,
    async () => {
        activityList.value = await getcalendarDay(props.date)
    }, {
    immediate: true
})


</script>

<template>
    <div class="content">
        <div class="content__header">
            <h6 class="content__title"><span> فعالیت های </span> {{ moment(date * 1000).format('jD jMMMM') }}</h6>
        </div>
        <div class="content__list">
            <template v-for="(activity, index) in activityList" :key="index">
                <CurrentEventCard :data="new Activity(activity)" />
            </template>
        </div>
    </div>
</template>
<style scoped lang="scss">
.content {
    width: 100%;

    &__title {
        text-align: center;
        margin-bottom: 12px;
    }
}
</style>