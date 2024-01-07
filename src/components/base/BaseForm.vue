<script setup>
import * as Yup from 'yup';
import { Form as ValidationForm, configure } from 'vee-validate';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

const emits = defineEmits(['close', 'submit']);

defineProps({
    data: {
        type: Object
    },
    schema: {
        type: Yup.ObjectSchema,
        required: true
    },
    loadingButton: {
        type: Boolean
    },
    initialValues: {
        type: Object
    }
});

configure({
    validateOnInput: true
});

const onSubmit = values => {
    emits('submit', values);
};
</script>
<template>
    <validation-form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues">
        <h3 class="title">{{ data?.title }}</h3>
        <div class="form">
            <BaseInput v-for="(input, index) in data?.inputs" :key="index" :data="input" />
            <div class="form__button">
                <slot></slot>
                <BaseButton v-bind="data?.button" :is-loading="loadingButton" />
            </div>
        </div>
    </validation-form>
</template>
<style scoped lang="scss">
.form {
    max-width: 320px;
    margin: 0 auto;
    &__button {
        @include mixins.flex($gap: 10px);
    }
}

.title {
    margin-bottom: 32px;
    text-align: center;
    font: typography.$font_h3;
    color: variables.$txtLight_selected;
}
</style>
