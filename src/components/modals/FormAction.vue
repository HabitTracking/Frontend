<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseInput from '@base/BaseInput.vue';
import { Form as ValidationForm, configure } from 'vee-validate';
import DatePicker from '../modals/DatePicker.vue';
import { schemaActivity } from '@/plugins/yup';
import { activityForm as data } from '@/common/constants/forms';
import Activity from '../homePage/activity/Activity';
import FilterActivityType from './FilterActivityType.vue';
import { ref } from 'vue';
import { activityTypeStore } from '@/stores/activityTypeStore';

const emits = defineEmits(['close', 'submit']);

defineProps({
    value: {
        type: Object
    }
});

configure({
    validateOnInput: true
});
const store = activityTypeStore();

const onSubmit = values => {
    emits('submit');
    Activity.addActivity(values);
    store.selectedActivitytype = '';
};

const showFilterActivityType = ref(false);

const submitFilteractivityType = activityTypes => {
    showFilterActivityType.value = false;
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

                <div @click="showFilterActivityType = true">
                    <base-input :data="data?.activityType" />
                </div>
            </div>
            <!-- <color-picker v-model:pureColor="pureColor" /> -->
        </base-modal>
        <FilterActivityType
            v-if="showFilterActivityType"
            @close="showFilterActivityType = false"
            @submit="submitFilteractivityType"
        />
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
