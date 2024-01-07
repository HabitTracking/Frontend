<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseInput from '@base/BaseInput.vue';
import { Form as ValidationForm, configure } from 'vee-validate';
import DatePicker from '../modals/DatePicker.vue';
import { activityTypeStore } from '@/stores/activityTypeStore';
import { storeToRefs } from 'pinia';
import { schemaActivity } from '../../plugins/yup';
import { activityForm as data } from '../../common/constants/forms';
import Activity from '../homePage/activity/Activity';

const emits = defineEmits(['close', 'submit']);

defineProps({
    value: {
        type: Object
    }
});

configure({
    validateOnInput: true
});

const { titleActivityTypes } = storeToRefs(activityTypeStore());

const onSubmit = values => {
    emits('submit');
    Activity.addActivity(values);
};
</script>

<template>
    <validation-form @submit="onSubmit" :validation-schema="schemaActivity" :initial-values="value">
        <base-modal :title="data.title" :button="data.button" @close="$emit('close')">
            <div class="form">
                <base-input v-for="(input, index) in data.inputs" :key="index" :data="input" />

                <date-picker
                    :dataInput="data.time?.date"
                    type="datetime"
                    format="jD jMMMM jYYYY  HH:mm"
                />

                <div class="form__time">
                    <base-input :data="data?.frequency" :selections="data.frequency.options" />

                    <date-picker
                        :dataInput="data.time?.dueDate"
                        type="date"
                        format="jD jMMMM jYYYY"
                    />
                </div>
                <div class="form__time">
                    <base-input :data="data?.target" />
                    <base-input :data="data?.unit" />
                </div>

                <!-- <color-picker v-model:pureColor="pureColor" /> -->

                <base-input :data="data?.activityType" :selections="titleActivityTypes" />
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
