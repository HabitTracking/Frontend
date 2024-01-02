<script setup>
import { defineAsyncComponent, computed } from 'vue';
import BaseIcon from './BaseIcon.vue';

defineEmits(['remove']);

const props = defineProps({
    theme: {
        type: String,
        default: 'primary',
        validator: theme => ['red', 'violet', 'orange', 'yellow', 'blue', 'primary'].includes(theme)
    },
    icon: {
        type: [String, Boolean],
        default: false
    },
    isActive: Boolean,
    canRemove: Boolean,
    text: String
});

const headingIcon = defineAsyncComponent(() =>
    import(`../../assets/icons/filterIcons/icon${props.icon}.vue`)
);

const isActiveTag = computed(() => (props.isActive ? `tag--${props.theme}` : ''));
</script>

<template>
    <div class="tag" :class="isActiveTag">
        <headingIcon v-if="icon" class="tag__icon" :class="{ 'tag__icon--active': isActive }" />
        {{ text }}
        <BaseIcon
            path="modalIcons/iconCancelFilter.vue"
            v-if="canRemove"
            class="tag__icon"
            :class="{ 'tag__icon--active': isActive }"
            @click="$emit('remove')"
        />
    </div>
</template>
<style scoped lang="scss">
$themes: 'red' themes.$error100 themes.$error600, 'violet' themes.$tertiary100 themes.$tertiary600,
    'orange' themes.$warning100 themes.$warning600,
    'yellow' themes.$secondary100 themes.$secondary600, 'blue' themes.$info100 themes.$info600;

.tag {
    width: max-content;
    @include mixins.flex(center, center, 4px);
    font: typography.$font_body2;
    color: variables.$gray900;
    box-shadow: variables.$shadow;
    border-radius: 12px;
    padding-inline: 8px;
    background-color: #ffffff;
    text-align: center;
    outline: none;
    user-select: none;

    &__icon {
        cursor: pointer;
        fill: variables.$gray900;
        &--active {
            fill: themes.$primary900;
        }
    }

    @each $name, $bg, $color in $themes {
        &--#{$name} {
            color: $color;
            background-color: $bg;
            border: 1px solid $bg;
        }
    }

    &--primary {
        color: themes.$primary900;
        background-color: themes.$primary200;
        border: 1px solid themes.$primary500;
    }
}
</style>
