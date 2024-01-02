<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import BaseTag from '@base/BaseTag.vue';
</script>

<template>
    <div class="header">
        <h6 class="header__title">گزارش ها</h6>
        <div class="header__tags">
            <BaseTag
                v-for="(duration, index) in ['روزانه', 'هفتگی', 'ماهانه', 'سالانه']"
                :key="index"
                :text="duration"
            />
        </div>
    </div>
    <div class="content">
        <div class="max">
            <BaseIcon class="max__icon" path="homeIcon/iconReport.vue" />
            <p class="max__description">بدون فعالیت</p>
        </div>
        <div class="list">
            <h6 class="list__title">بیشترین ها</h6>
            <p class="list__description">اولین فعالیت خودت رو بساز</p>
        </div>
        <div class="reminder">
            <h6 class="reminder__title">خلاصه گزارش</h6>
            <p class="reminder__description">اولین فعالیت خودت رو بساز</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    @include mixins.flex(space-between, center);

    &__tags {
        font: typography.$font_body2;
        @include mixins.flex(space-between, center, 8px);
    }
    margin-bottom: 16px;
}
.content {
    @include mixins.flex(space-between, center, 20px);
    min-height: 200px;

    .max {
        @include mixins.flex(center, $direction: column);
        @include mixins.base-card;
        padding: 20px;
        background: variables.$bgLightSurface;

        &__description {
            margin-top: 14px;
            font: typography.$font_body1;
            color: variables.$gray700;
        }
    }
    .list {
        @include mixins.base-card;
        @include mixins.flex(center, $direction: column);
        padding: 20px;
        background: variables.$bgLightSurface;

        &__description {
            color: variables.$gray700;
        }
    }
    .reminder {
        @include mixins.flex(center, $direction: column);
        @include mixins.base-card;
        padding: 20px;
        background: variables.$bgLightSurface;

        &__description {
            color: variables.$gray700;
        }
    }
}
</style>
