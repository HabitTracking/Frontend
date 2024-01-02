<template>
    <nav class="navbar">
        <ul class="navbar__list">
            <li class="navbar__item" v-for="(link, index) in ['Home', 'Activity']" :key="index">
                <router-link :to="{ name: link }">
                    <BaseIcon :path="`homeIcon/icon${link}.vue`" />
                </router-link>
            </li>
            <li class="navbar__item"></li>
        </ul>
        <FloatingButton />
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import BaseIcon from '@base/BaseIcon.vue';
import FloatingButton from '@/components/side/navbar/FloatingButton.vue';
</script>

<style scoped lang="scss">
.navbar {
    @include mixins.flex(space-between, center, 30px, column);
    padding: 88px 10px 64px;
    height: 100%;

    @include mixins.screen(med) {
        padding: 15px 40px;
    }

    &__list {
        padding-inline: 0;
        transition: all 0.4s;
        @include mixins.flex(flex-start, center, 30px, column);

        @include mixins.screen(med) {
            margin-bottom: -10px;
            @include mixins.flex(space-around, center);
            @include mixins.screen(small) {
                justify-content: space-between;
            }
        }
    }

    &__item {
        width: auto;
        height: auto;
        @include mixins.screen(small) {
            width: 100%;
        }
    }
}
</style>
