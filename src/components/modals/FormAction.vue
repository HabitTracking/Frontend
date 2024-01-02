<script setup>
import * as Yup from 'yup';
import FilePicker from './FilePicker.vue';
import BaseModal from '@base/BaseModal.vue';
import BaseInput from '@base/BaseInput.vue';
import { Form as ValidationForm, configure } from 'vee-validate';
import DatePicker from '../modals/DatePicker.vue';
import { activityTypeStore } from '@/stores/activityTypeStore';

const emits = defineEmits(['close', 'submit']);

defineProps({
    data: {
        type: Object,
        required: true
    },
    schema: {
        type: Yup.ObjectSchema,
        required: true
    },
    value: {
        type: Object
    }
});

configure({
    validateOnInput: true
});

const onSubmit = values => {
    if (values.users) {
        values.users = values.users?.filter(user => user !== undefined);
    }
    emits('submit', values);
};
</script>

<template>
    <validation-form @submit="onSubmit" :validation-schema="schema" :initial-values="value">
        <base-modal :title="data.title" :button="data.button" @close="$emit('close')">
            <div class="form">
                <file-picker v-if="data.picture" :files="value?.images" />

                <base-input v-for="(input, index) in data.inputs" :key="index" :data="input" />

                <date-picker v-if="data.time?.date" :dataInput="data.time?.date" type="date"/>

                <div class="form__time">
                    <date-picker
                        v-if="data.time?.startTime"
                        :dataInput="data.time?.startTime"
                        type="time"
                    />

                    <date-picker
                        v-if="data.time?.endTime"
                        :dataInput="data.time?.endTime"
                        type="time"
                    />
                </div>

                <base-input
                    v-if="data?.select"
                    :data="data?.select"
                    :selections="activityTypeStore().titleActivityTypes"
                />
            </div>
        </base-modal>
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
