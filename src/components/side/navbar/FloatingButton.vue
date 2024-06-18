<script setup>
import { ref } from 'vue';
import BaseIcon from '@base/BaseIcon.vue';
import FormAction from '@/components/modals/FormAction.vue';
import ActivityTypeForm from '../../modals/ActivityTypeForm.vue';
import Activity from '../../homePage/activity/Activity';
import ActivityType from '../../homePage/activityType/ActivityType';

const floatingButtonModal = ref(false);
const activityModal = ref(false);
const activityTypeModal = ref(false);

const closeFloatingButton = () => {
    floatingButtonModal.value = false;
    activityModal.value = false;
    activityTypeModal.value = false;
};

const addActivity = values => {
    Activity.addActivity(values)
    closeFloatingButton()
}

const addActivityType = values => {
    ActivityType.add(values)
    closeFloatingButton()
}
</script>

<template>
    <BaseIcon path="homeIcon/iconAdd.vue" class="plus" :class="{ 'plus--rotate': floatingButtonModal }"
        @click="floatingButtonModal = true" />
    <div v-if="floatingButtonModal" class="floating-button" @click.self="closeFloatingButton">
        <div class="floating-button__activity">
            <div class="floating-button__icon" @click.stop="activityModal = true">
                <BaseIcon :path="`floatingIcons/iconActivityActive.vue`" />
            </div>

            <h4 class="floating-button__title">فعالیت</h4>
        </div>
        <div class="floating-button__activityType">
            <div class="floating-button__icon" @click.stop="activityTypeModal = true">
                <BaseIcon :path="`floatingIcons/iconActivityTypeActive.vue`" />
            </div>

            <h4 class="floating-button__title">نوغ فعالیت</h4>
        </div>
    </div>
    <FormAction v-if="activityModal" @close="closeFloatingButton" @submit="addActivity" />

    <ActivityTypeForm v-if="activityTypeModal" @close="closeFloatingButton" @submit="addActivityType" />
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
        white-space: nowrap;
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
