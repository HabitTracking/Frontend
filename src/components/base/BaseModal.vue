<script setup>
import BaseButton from './BaseButton.vue';

defineEmits(['close', 'submit']);

defineProps({
    title: String,
    button: {
        type: Object
    }
});
</script>

<template>
    <section class="overlay" @click.self="$emit('close')">
        <div class="modal">
            <div class="modal__title">{{ title }}</div>
            <slot class="modal__content"></slot>

            <div class="modal__button">
                <base-button @click="$emit('close')" v-bind="button?.cancel" />
                <base-button @click="$emit('submit')" v-bind="button?.submit" />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.overlay {
    @include mixins.fix-position(0, 0);
    min-width: 100%;
    min-height: 100vh;
    @include mixins.flex(center);
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 72;

    .modal {
        width: 100%;
        max-width: 420px;
        height: max-content;
        padding: 32px 24px 40px;
        position: relative;
        border-radius: 20px;
        background-color: variables.$bgLightdefault;

        @include mixins.screen(small) {
            max-width: 100%;
            padding-inline: 25px;
            border-radius: 0;
            height: 100vh;
        }

        &__title {
            text-align: center;
            font: typography.$font_h6;
            color: variables.$gray900;
            margin-bottom: 32px;
        }

        &__content {
            width: 100%;
            height: 100%;
            box-shadow: variables.$shadow;
            background-color: variables.$bgLightdefault;
        }

        &__button {
            width: 100%;
            @include mixins.flex($gap: 8px);

            @include mixins.screen(small) {
                width: auto;
                position: absolute;
                bottom: 102px;
                left: 10px;
                right: 10px;
            }
        }
    }
}
</style>
