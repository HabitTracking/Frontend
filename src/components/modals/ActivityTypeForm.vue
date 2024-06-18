<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseInput from '@base/BaseInput.vue';
import { Form as ValidationForm, configure } from 'vee-validate';
import { activityTypeForm as data } from '../../common/constants/forms';
import { schemaActivityType as schema } from '../../plugins/yup';
import ActivityType from '@/components/homePage/activityType/ActivityType';

const emits = defineEmits(['close', 'submit']);

defineProps({
    value: {
        type: Object
    }
});

configure({
    validateOnInput: true
});

const onSubmit = values => {
    ActivityType.add(values);
    emits('submit');
};
</script>

<template>
    <validation-form @submit="onSubmit" :validation-schema="schema" :initial-values="value">
        <base-modal :title="data.title" :button="data.button" @close="$emit('close')">
            <div class="form">
                <base-input v-for="(input, index) in data.inputs" :key="index" :data="input" />
            </div>
        </base-modal>
    </validation-form>
</template>

<style scoped lang="scss">
.form {
    padding-bottom: 20px;
}
</style>
