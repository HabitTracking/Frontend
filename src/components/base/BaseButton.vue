<script setup>
const emit = defineEmits(['click']);
defineProps({
    text: {
        type: String,
        required: false
    },
    type: {
        type: String,
        validator: value => ['submit', 'reset', 'button'].includes(value),
        default: 'button'
    },
    kind: {
        type: String,
        validator: value => ['filled', 'warning', 'outline'].includes(value)
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});
const onClick = () => emit('click');
</script>

<template>
    <button
        class="button"
        :disabled="isLoading"
        :type="type"
        :class="`button--${kind}`"
        @click="onClick()"
    >
        <span v-if="!isLoading">{{ text }}</span>
        <span v-else class="button--loading"></span>
    </button>
</template>

<style scoped lang="scss">
.button {
    width: 100%;
    height: 56px;
    @include mixins.flex(center, center);
    font: typography.$font_button1;
    color: themes.$primary100;
    text-align: center;
    vertical-align: middle;
    border-radius: 20px;
    transition: all 0.2s ease-out;

    &--filled {
        background-color: themes.$primary600;

        &:hover {
            background-color: themes.$primary800;
        }
        &:active {
            background-color: themes.$primary900;
        }
    }
    &--outline {
        background-color: variables.$bgLightdefault;
        border: 2px solid themes.$primary600;
        color: themes.$primary600;
        &:hover {
            background-color: themes.$primary100;
            border-color: themes.$primary700;
        }
        &:active {
            background-color: themes.$primary200;
            border-color: themes.$primary900;
        }
    }
    &--warning {
        background-color: themes.$errorMain;

        &:hover {
            background-color: themes.$error800;
        }
        &:active {
            background-color: themes.$error900;
        }
    }
    &--loading {
        width: 40px;
        height: 40px;
        animation: ring 1.2s ease-in-out infinite;
        border-radius: 50%;
        border: 6px solid variables.$bgLightSurface;
        border-color: variables.$bgLightSurface transparent variables.$bgLightSurface transparent;
    }
    @keyframes ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
