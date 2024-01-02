<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import DatePicker from 'vue3-persian-datetime-picker';
import { filterModal as data } from '@/common/constants/modal';
import FilterActivityType from './FilterActivityType.vue';
import { ref, computed } from 'vue';

const emits = defineEmits(['close', 'submit']);

const props = defineProps({
    type: {
        type: String
    },
    users: {
        type: Array
    },
    rangeDate: {
        type: Array
    },
    activityTypes: {
        type: Array
    }
});

const showDatePicker = ref(false);
const rangeDatePicker = ref(props.rangeDate);

const selectedActivityTypes = ref(props.activityTypes);
const showFilterActivityType = ref(false);

const selectedUsers = ref(props.users);

const dateFormated = computed(() =>
    rangeDatePicker.value
        .map(date =>
            new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'short' }).format(
                new Date(date).getTime()
            )
        )
        .join(' تا ')
);

const submitFilteractivityType = activityTypes => {
    selectedActivityTypes.value = activityTypes;
    showFilterActivityType.value = false;
};

const toTimeStamp = (dates = []) => dates.map(date => new Date(date).getTime());

const onSubmit = () => {
    emits(
        'submit',
        toTimeStamp(rangeDatePicker.value),
        selectedActivityTypes.value,
        selectedUsers.value
    );
};
</script>
<template>
    <base-modal @close="$emit('close')" @submit="onSubmit" class="filter" v-bind="data">
        <div
            v-if="type == 'activity'"
            class="filter__activity-type"
            @click="showFilterActivityType = true"
        >
            <p>{{ data?.headerActivityType }}</p>
            <BaseIcon path="modalIcons/iconDart.vue" />
        </div>
        <div class="filter__tags">
            <base-tag
                v-for="(activityType, index) in selectedActivityTypes"
                :key="index"
                :text="activityType"
                is-active
                can-remove
                @remove="selectedActivityTypes.splice(index, 1)"
            />
        </div>

        <hr v-if="type == 'activity'" class="filter__line" />
        <div class="filter__date" @click="showDatePicker = true">
            <p>{{ data?.date }}</p>
            <BaseIcon path="modalIcons/iconDart.vue" />
        </div>
        <base-tag
            v-if="rangeDatePicker?.length == 2"
            is-active
            can-remove
            @remove="rangeDatePicker = []"
            :text="dateFormated"
        />
        <hr class="filter__line" />
        <div class="filter__tags">
            <base-tag
                v-for="(user, index) in selectedUsers"
                :key="index"
                :text="user.firstName"
                is-active
                can-remove
                @remove="selectedUsers.splice(index, 1)"
            />
        </div>
    </base-modal>

    <date-picker
        v-model="rangeDatePicker"
        range
        class="date-picker"
        convertNumbers
        :editable="false"
        format="YYYY/MM/DD"
        custom-input=".input"
        :show="showDatePicker"
        @close="showDatePicker = false"
    />

    <FilterActivityType
        v-if="showFilterActivityType"
        :activityTypes="selectedActivityTypes"
        @close="showFilterActivityType = false"
        @submit="submitFilteractivityType"
    />
</template>
<style scoped lang="scss">
.filter {
    @each $element in 'activity-type', 'date', 'users' {
        &__#{$element} {
            width: 100%;
            height: 32px;
            @include mixins.flex(space-between, center);
            margin-block: 16px;
            cursor: pointer;
        }
    }

    &__tags {
        @include mixins.flex(flex-start, center, 8px, row, wrap);
    }

    &__line {
        width: 100%;
        border: 1px solid variables.$gray200;
    }
}
</style>
