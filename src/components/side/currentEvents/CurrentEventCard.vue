<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import Activity from '../../homePage/activity/Activity';
// import BaseTag from ''
defineProps({
    data: {
        type: Activity,
        required: true
    }
});
</script>

<template>
    <div class="card">
        <h6 class="card__title">{{ data.title }}</h6>
        <p class="card__description">{{ data?.description }}</p>
        <div class="footer">
            <div class="footer__date">
                <BaseIcon path="cardIcon/iconDatePale.vue" />
                {{ data?.getDate() }}
            </div>
            <div class="footer__duration">
                <BaseIcon path="cardIcon/iconTimePale.vue" />
                {{ data.getDueDate() }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    background: variables.$bgLightdefault;
    height: max-content;
    padding: 20px;
    margin-bottom: 20px;
    width: 100%;

    .footer {
        width: 100%;
        @include mixins.flex(flex-start, center, 16px, row, wrap);
        font: typography.$font_body2;
        color: variables.$gray700;
        padding-top: 16px;

        &__duration,
        &__date {
            @include mixins.flex(space-between, center, 6px);
        }
    }
}
</style>
