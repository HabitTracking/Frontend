<script setup>
import { computed } from 'vue';
import CurrentEventCard from './CurrentEventCard.vue';
import { activityStore } from '@/stores/activityStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
    date: {
        type: Number
    }
});

const { events } = storeToRefs(activityStore());

const toPersianDate = computed(() =>
    new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'short'
    }).format(props.date)
);

const eventList = computed(() => events.value?.filter(({ date }) => date == props?.date));
</script>

<template>
    <div class="content">
        <div class="content__header">
            <h6 class="content__title"><span> فعالیت های </span> {{ toPersianDate }}</h6>
        </div>
        <div class="content__list">
            <CurrentEventCard v-for="(event, index) in eventList" :key="index" :data="event" />
        </div>
    </div>
</template>
