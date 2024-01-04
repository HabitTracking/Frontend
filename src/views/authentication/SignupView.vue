<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import { schemaSignup } from '@/plugins/yup';
import { useRouter } from 'vue-router';
import { signup } from '@/services/usermanager';
import BaseForm from '@/components/base/BaseForm.vue';
import { signupForm } from '@/common/constants/forms';

const router = useRouter();

const onSubmit = async values => {
    loadingButton.value = true;

    const isSignup = await signup(values);
    loadingButton.value = false;
    if (isSignup) router.push({ name: 'login' });
    else router.push({ name: 'signup' });
};
</script>

<template>
    <base-form :data="signupForm" @submit="onSubmit" :schema="schemaSignup" />
    <div class="arrow">
        <RouterLink to="/">
            <BaseIcon path="common/iconArrow.vue" />
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.arrow {
    position: absolute;
    top: 36px;
    right: 36px;
}
</style>
