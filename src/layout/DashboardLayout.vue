<script setup>
import SideBar from '@/components/side/TheSideBar.vue';
import NavBar from '@/components/side/navbar/TheNavBar.vue';

import { activityStore } from '@/stores/activityStore';
import { activityTypeStore } from '@/stores/activityTypeStore';

activityStore().getActivity();
activityTypeStore().getActivityType();
</script>

<template>
    <div class="wrapper">
        <div class="wrapper__dashboard">
            <aside class="wrapper__navbar">
                <NavBar />
            </aside>
            <main class="wrapper__view">
                <Suspense>
                    <slot></slot>
                </Suspense>
            </main>
            <aside class="wrapper__sidebar">
                <Suspense>
                    <component :is="SideBar" />
                </Suspense>
            </aside>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    background-color: variables.$bgLightSurface;
    @include mixins.flex(space-evenly, auto);

    &__navbar {
        flex-basis: 5%;
        background: variables.$bgLightSurface;

        @include mixins.screen(med) {
            background: no-repeat center url(../assets/images/navbar-mobile.svg);
            background-size: 90vw 100vw;
            @include mixins.fix-position($bottom: 0);
            width: 100%;
            z-index: 20;
        }
        @include mixins.screen(small) {
            background-size: 90vw;
        }
    }

    &__dashboard {
        width: 100%;
        display: flex;
    }
    &__sidebar {
        margin-inline: 0;
        position: relative;
        flex-basis: 25%;
        height: 100vh;
        overflow-y: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: themes.$primary500;
            border-radius: 5px;
        }
        &::-webkit-scrollbar-track {
            background: themes.$primary200;
            border-radius: 5px;
        }
        @include mixins.screen(large) {
            flex-basis: 40%;
        }
        @include mixins.screen(med-large) {
            display: none;
        }
    }
    &__view {
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        height: 99vh;
        margin-top: 8px;
        flex-basis: 80%;
        background-color: variables.$bgLightdefault;
        border-radius: 40px 40px 0 0;
        padding: 80px 96px;
        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: themes.$primary500;
            border-radius: 5px;
        }
        &::-webkit-scrollbar-track {
            background: themes.$primary200;
            border-radius: 5px;
        }

        @include mixins.screen(med-large) {
            flex-basis: 100%;
        }
        @include mixins.screen(med) {
            padding: 30px 36px;
        }
        @include mixins.screen(small) {
            padding: 20px 20px 60px;
            margin: 0;
            border-radius: 0;
        }
    }
}
</style>
