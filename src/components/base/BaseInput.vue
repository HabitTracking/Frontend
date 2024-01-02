<script setup>
import { defineAsyncComponent, ref } from 'vue';
import BaseIcon from '@base/BaseIcon.vue';
import { Field, ErrorMessage, useField } from 'vee-validate';

const props = defineProps({
    data: {
        type: Object,
        required: true,
        validator: value => value.type && value.name
    },
    modelValue: String,
    selections: Array
});

const { value: inputValue, errorMessage: error, meta } = useField(props.data?.name);

const headingIcon = defineAsyncComponent(() =>
    import(`../../assets/icons/formIcons/${props.data?.headingIcon}.vue`)
);

const isPassword = ref(props.data.type === 'password');
</script>

<template>
    <div class="box">
        <div class="input" :class="[{ 'input--invalid': error }, { 'input--valid': meta.valid }]">
            <heading-icon />

            <Field
                v-if="data.type === 'select'"
                :name="data.name"
                class="input__select"
                as="select"
            >
                <option v-for="(selection, index) in selections" :key="index" :value="selection">
                    {{ selection }}
                </option>
            </Field>

            <Field
                v-else
                :name="data.name"
                :type="isPassword ? data.type : 'text'"
                :class="`input__${data.type}`"
                :as="data?.as"
                spellcheck="false"
                @input="modelValue"
            />

            <label class="input__label" :class="{ 'input__label--focus': inputValue }">{{
                data?.label
            }}</label>
            <div
                v-if="data?.leadingIcon == 'iconEye-slash'"
                @click="isPassword = !isPassword"
                style="cursor: pointer"
            >
                <BaseIcon path="formIcons/iconEye-slash.vue" v-if="isPassword" />
                <BaseIcon path="formIcons/iconEye.vue" v-else />
            </div>
        </div>
        <div class="box__error">
            <error-message :name="data?.name" v-slot="{ message }">
                <BaseIcon path="common/iconError.vue" />
                {{ message }}
            </error-message>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    width: 100%;
    .input {
        @include mixins.flex(flex-start);
        border: 1px solid variables.$gray300;
        border-radius: 16px;
        padding: 8px 9px;
        position: relative;
        transition: label 0.2s ease-in;
        margin-bottom: 22px;

        &:hover,
        &:focus {
            border-color: variables.$gray500;
        }

        &__text {
            width: 100%;
            margin: 12px 8px 0 0;
            font: typography.$font_subtitle1;
            color: variables.$txtLight_selected;
        }
        &__password {
            @extend .input__text;
        }
        &__textArea {
            @extend .input__text;
            resize: none;
            height: 80px;
            text-overflow: ellipsis;
        }

        &__select {
            @extend .input__text;
            text-align: right;
            appearance: none;
            border-radius: 10px;
        }
        &__label {
            @include mixins.absolute(13px, 41px);
            font: typography.$font_subtitle1;
            color: variables.$txtLight_base2;
            pointer-events: none;
            transition: all 0.15s ease-in;

            &--focus {
                font: typography.$font_caption;
                color: variables.$gray900;
                transform: translateY(-6px);
            }
        }

        &__text:focus ~ .input__label {
            @extend .input__label--focus;
        }

        &--invalid {
            border-color: themes.$error700;
            background-color: themes.$error100;
            margin-bottom: 6px;

            &:hover {
                border-color: themes.$error900;
            }
        }

        &--valid {
            border-color: themes.$primary500;
            background-color: themes.$primary100;

            &:hover {
                border-color: themes.$primary800;
            }
        }
    }

    &__error {
        margin: 0 4px 4px 0;
        @include mixins.flex(auto, auto, 3px);
        font: typography.$font_caption;
        color: themes.$error900;
    }
}
</style>
