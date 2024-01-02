<script setup>
import BaseTag from '@/components/base/BaseTag.vue';
import { ref, computed, watch } from 'vue';
import FilterModal from '@/components/modals/FilterModal.vue';

const emit = defineEmits(['filter']);

const props = defineProps({
    list: {
        type: Array
    },
    type: {
        type: String
    }
});

const filterModalShown = ref(false);

const rangeDate = ref([]);
const activityTypes = ref([]);
const users = ref([]);

const dateFormated = computed(() =>
    rangeDate.value
        .map(date =>
            new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'short' }).format(date)
        )
        .join(' تا ')
);

const submitFilter = (rangeDatePicker, selectedActivityTypes, selectedUsers) => {
    activityTypes.value = selectedActivityTypes;
    rangeDate.value = rangeDatePicker;
    users.value = selectedUsers;

    filterModalShown.value = false;
};

watch(
    () => [rangeDate.value, activityTypes.value, users.value],
    () => emit('filter', filter(rangeDate.value, activityTypes.value, users.value)),
    {
        deep: true
    }
);

const filter = (rangeDate = [], activityTypes = [], users = []) =>
    props.list?.filter(entity => {
        if (activityTypes?.length !== 0 && !activityTypes?.includes(entity?.activityType))
            return false;

        if (entity?.date > rangeDate?.[1] || entity?.date < rangeDate?.[0]) return false;

        if (users?.length !== 0 && !users?.some(user => entity?.users?.includes(user.userId)))
            return false;

        return true;
    });

const filterTagIsActive = computed(() =>
    rangeDate.value?.length || activityTypes.value?.length || users.value?.length ? true : false
);
</script>

<template>
    <div class="filter-bar">
        <base-tag
            text="فیلتر ها"
            icon="Filter"
            @click="filterModalShown = true"
            :is-active="filterTagIsActive"
        />
        <base-tag
            v-if="rangeDate?.length == 2"
            is-active
            can-remove
            :text="dateFormated"
            @remove="rangeDate = []"
        />
        <base-tag
            v-for="(activityType, index) in activityTypes"
            :key="index"
            :text="activityType"
            is-active
            can-remove
            @remove="activityTypes?.splice(index, 1)"
        />
        <base-tag
            v-if="activityTypes?.length == 0 && type === 'activity'"
            @click="filterModalShown = true"
            text="نوع فعالیت"
            icon="Dumbble"
        />
        <base-tag
            v-for="(user, index) in users"
            :key="index"
            :text="user.firstName"
            is-active
            can-remove
            @remove="users.splice(index, 1)"
        />
    </div>

    <FilterModal
        v-if="filterModalShown"
        :users="users"
        :rangeDate="rangeDate"
        :activityTypes="activityTypes"
        :type="type"
        @close="filterModalShown = false"
        @submit="submitFilter"
    />
</template>

<style scoped lang="scss">
.filter-bar {
    @include mixins.flex(flex-end, center, 8px, row, wrap);
}
</style>
