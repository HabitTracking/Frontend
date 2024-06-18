<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseInput from '@base/BaseInput.vue';
import { Form as ValidationForm, configure } from 'vee-validate';
import DatePicker from '../modals/DatePicker.vue';
import { schemaActivity } from '@/plugins/yup';
import { activityForm as data } from '@/common/constants/forms';
// import FilterActivityType from './FilterActivityType.vue';
import { activityTypeStore } from '../../stores/activityTypeStore';
import { storeToRefs } from 'pinia';

const emits = defineEmits(['close', 'submit']);

defineProps({
    value: {
        type: Object
    }
});

configure({
    validateOnInput: true
});

const { activityTypes } = storeToRefs(activityTypeStore())

const onSubmit = values => {
    emits('submit', values);
};
</script>

<template>
    <validation-form @submit="onSubmit" :validation-schema="schemaActivity" :initial-values="value">
        <base-modal :title="data.title" :button="data.button" @close="$emit('close')">
            <div class="form">
                <base-input v-for="(input, index) in data.inputs" :key="index" :data="input" />

                <date-picker :dataInput="data.time?.date" type="datetime" format="jD jMMMM jYYYY  HH:mm" />

                <div class="form__time">
                    <base-input :data="data?.frequency" :selections="data.frequency.options" />

                    <date-picker :dataInput="data.time?.dueDate" type="date" format="jD jMMMM jYYYY" />
                </div>
                <div class="form__time">
                    <base-input :data="data?.target" />
                    <base-input :data="data?.unit" />
                </div>

                <base-input :data="data?.activityType"
                    :selections="activityTypes.reduce((a, c) => [...a, { name: c.title, value: c.id }], [])" />
            </div>
        </base-modal>
        <!-- <FilterActivityType
            v-if="showFilterActivityType"
            @close="showFilterActivityType = false"
            @submit="submitFilteractivityType"
        /> -->
    </validation-form>
</template>

<style scoped lang="scss">
.form {
    padding-bottom: 20px;

    &__time {
        @include mixins.flex($gap: 8px);
    }
}
</style>
