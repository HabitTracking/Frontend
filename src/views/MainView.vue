<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '../components/base/BaseButton.vue';
const router = useRouter();

const button = {
    login: {
        text: 'ورود / ثبت نام',
        type: 'button',
        kind: 'filled'
    },
    about: {
        text: 'درباره ما',
        type: 'button',
        kind: 'outline'
    }
};
</script>
<template>
    <div class="">
        <div class="">
            <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="buttons">
            <base-button @click="router.push('/about')" v-bind="button?.about" />
            <base-button @click="router.push('/login')" v-bind="button?.login" />
        </div>
    </div>
</template>
<style scoped lang="scss">
.buttons {
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
</style>
