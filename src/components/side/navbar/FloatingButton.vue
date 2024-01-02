<script setup>
import { ref } from 'vue';
import BaseIcon from '@base/BaseIcon.vue';
import FormAction from '@/components/modals/FormAction.vue';
import Activity from '@/components/homePage/activity/Activity';
import { actionForms } from '@/common/constants/forms';

const floatingButtonModal = ref(false);
const formModal = ref(false);

const actionData = ref();
const validationSchema = ref();

const selected = ref();

const closeFloatingButton = () => {
    floatingButtonModal.value = false;
    formModal.value = false;
};

const create = (data, errors) => {
    floatingButtonModal.value = false;
    formModal.value = true;
    actionData.value = data;
    validationSchema.value = errors;
    selected.value = data?.nameEn;
};

const onSubmit = values => {
    formModal.value = false;
    if (selected.value == 'activity') Activity.addActivity(values);
};
</script>

<template>
    <BaseIcon
        path="homeIcon/iconAdd.vue"
        class="plus"
        :class="{ 'plus--rotate': floatingButtonModal }"
        @click="floatingButtonModal = true"
    />
    <div v-if="floatingButtonModal" class="floating-button" @click.self="closeFloatingButton">
        <div
            v-for="(form, index) in actionForms"
            :class="`floating-button__${form.nameEn}`"
            :key="index"
        >
            <div class="floating-button__icon" @click="create(form, form.schema)">
                <BaseIcon :path="`floatingIcons/icon${form.nameEn}Active.vue`" />
            </div>

            <h4 class="floating-button__title">{{ form.name }}</h4>
        </div>
    </div>
    <FormAction
        v-if="formModal"
        :data="actionData"
        :schema="validationSchema"
        @close="closeFloatingButton"
        @submit="onSubmit"
    />
</template>

<style scoped lang="scss">
.plus {
    transition: all 0.25s ease-in;
    &--rotate {
        transform: rotate(135deg);
    }

    @include mixins.screen(med) {
        @include mixins.absolute($bottom: 30px);
        position: absolute;
        border-radius: 50%;
    }
}
.floating-button {
    @include mixins.fix-position(0, 0);
    min-width: 100%;
    min-height: 100%;

    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;

    &__activity {
        @include mixins.absolute($right: 157px, $bottom: 145px);
        @include mixins.screen(med) {
            @include mixins.absolute($right: 75%, $bottom: 50px);
        }
    }
    &__activityType {
        @include mixins.absolute($right: 228px, $bottom: 34px);
        @include mixins.screen(med) {
            @include mixins.absolute($right: 50%, $bottom: 150px);
        }
    }

    &__icon {
        background-color: variables.$bgLightSurface;
        width: 64px;
        height: 64px;
        border-radius: 16px;
        padding-top: 18px;
        text-align: center;
        cursor: pointer;
    }

    &__title {
        color: variables.$bgLightSurface;
    }

    @each $component in 'activity', 'activityType' {
        &__#{$component} {
            width: 86px;
            height: 130px;
            @include mixins.flex(center, center, 4px, column);
            transform: translateX(50%);

            font: typography.$font_h6;
            animation: active 1s;
        }
    }
}
@keyframes active {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
