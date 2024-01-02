<script setup>
import BaseIcon from '@base/BaseIcon.vue';
const fullName = window.localStorage.getItem('fullName');
</script>

<template>
    <div class="profile">
        <div class="profile__info">
            <div class="profile__image">
                <img src="@/assets/images/Avatar.png" :title="fullName" alt="avatar" />
            </div>
            <div>
                <p class="profile__name">{{ fullName }}</p>
            </div>
        </div>
        <BaseIcon path="homeIcon/iconNotification.vue"/>
    </div>
</template>

<style scoped lang="scss">
.profile {
    @include mixins.flex(space-between, center);
    width: 100%;
    &__image {
        width: 50px;
        height: 50px;
    }
    &__info {
        @include mixins.grid(repeat(2, 1fr));
    }
    &__name {
        font: typography.$font_subtitle1;
    }
}
</style>
