<script setup>
import { login } from '@/services/usermanager';
import { useRouter } from 'vue-router';
import { schemaLogin } from '@/plugins/yup';
import { ref } from 'vue';
import { toast } from '@/plugins/toast';
// import { useCookies } from 'vue3-cookies';
import BaseForm from '@/components/base/BaseForm.vue';
import { loginForm } from '@/common/constants/forms';

const router = useRouter();
const loadingButton = ref(false);

const onSubmit = async values => {
    loadingButton.value = true;
    const authData = await login(values);
    console.log(authData);
    loadingButton.value = false;

    toast.success('ورود با موفقیت انجام شد');

    router.replace({ path: '/home' });
};
</script>

<template>
    <base-form
        :data="loginForm"
        @submit="onSubmit"
        :schema="schemaLogin"
        :loadingButton="loadingButton"
    />
    <div class="register">
        حساب کاربری ندارید؟
        <span>
            <RouterLink to="/signup" class="register__link">ثبت نام </RouterLink>
        </span>
    </div>
</template>

<style scoped lang="scss">
.register {
    width: 100%;
    font: typography.$font_body1;
    color: variables.$txtLight_base2;
    text-align: center;
    margin-top: 10px;

    &__link {
        font: typography.$font_subtitle1;
        color: variables.$txtLight_selected;
    }
}
</style>
