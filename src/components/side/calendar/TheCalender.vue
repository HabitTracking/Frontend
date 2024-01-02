<script setup>
import moment from 'jalali-moment';
import { ref } from 'vue';
import BaseIcon from '@base/BaseIcon.vue';
import { activityStore } from '@/stores/activityStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['select']);

const date = ref(moment());

const daySelected = ref();

const { activities } = storeToRefs(activityStore());

const weekDay = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

const countMonth = date => {
    const clonedDate = date.clone();
    const dates = [];

    clonedDate.startOf('jMonth');
    clonedDate.subtract(clonedDate.jDay() + 1, 'jDay');

    while (clonedDate.jDay() !== 6 || clonedDate.format('jYYYY/jMM') <= date.format('jYYYY/jMM')) {
        clonedDate.add(1, 'day');
        dates.push(clonedDate.valueOf());
    }
    return dates;
};

const countNumber = time => activities.value?.filter(({ date }) => time == date).length;

const toPersianYear = time => new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(time);

const formatDay = time => new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(time);

const isToday = time => moment().startOf('jDay').valueOf() === time;

const isDaySelected = time => daySelected.value == time;

const isOutedDay = time => moment(time).jMonth() !== date.value.jMonth();

const getDate = time => `${time.format('jMMMM')} ${toPersianYear(time)}`;

const selectDay = time => {
    daySelected.value = time;
    emit('select', daySelected.value);
};
</script>

<template>
    <div class="calendar">
        <div class="calendar__header">
            <h6 class="calendar__title">
                {{ getDate(date) }}
            </h6>
            <div class="calendar__arrows">
                <BaseIcon path="common/iconArrow.vue" @click="date.add(-1, 'jMonth')" />
                <BaseIcon path="common/iconArrowLeft.vue" @click="date.add(1, 'jMonth')" />
            </div>
        </div>
        <div class="calendar__container">
            <div class="calendar__week-day" v-for="(item, index) in weekDay" :key="index">
                {{ item.substring(0, 1) }}
            </div>
            <div
                v-for="(time, index) in countMonth(date)"
                :key="index"
                :class="[
                    'day',
                    { 'day--today': isToday(time) },
                    { 'day--selected': isDaySelected(time) },
                    { 'day--outday': isOutedDay(time) }
                ]"
                @click="selectDay(time)"
            >
                <span v-if="countNumber(time)" class="day--badge">
                    {{ countNumber(time) }}
                </span>
                {{ formatDay(time) }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.calendar {
    @include mixins.base-card;
    background: variables.$bgLightdefault;
    padding: 20px;
    height: max-content;

    &__header {
        padding-inline: 5px;
        @include mixins.flex(space-between, center);
    }
    &__arrows {
        @include mixins.flex(space-between, center, 10px);
        cursor: pointer;
    }
    &__week-day {
        text-align: center;
        font: typography.$font_subtitle2;
        color: variables.$gray500;
        user-select: none;
    }
    &__container {
        width: 100%;
        padding-top: 20px;
        @include mixins.grid(repeat(7, 1fr), $gap: 7px);
        column-gap: 5%;
        .day {
            width: 35px;
            height: 35px;
            display: grid;
            place-content: center;
            border: 2px solid transparent;
            border-radius: 12px;
            text-align: center;
            position: relative;
            cursor: pointer;
            user-select: none;
            font: typography.$font_body1;
            color: variables.$gray900;

            &--badge {
                width: 16px;
                height: 16px;
                @include mixins.absolute(-4px, -4px);
                font: typography.$font_overline;
                color: variables.$bgLightSurface;
                background-color: themes.$primary600;
                border-radius: 50%;
                text-align: center;
                padding-top: 3px;
            }
            &--selected {
                border-color: themes.$primary600;
                color: variables.$gray900;
            }
            &--today {
                background-color: themes.$primary600;
                color: variables.$bgLightSurface;
            }
            &--outday {
                color: variables.$gray400;
                pointer-events: none;
            }
        }
    }
}
</style>
