<script setup>
import BaseIcon from '@base/BaseIcon.vue';
import { ref } from 'vue';
import BaseModal from '../../base/BaseModal.vue';
import { logout as form } from '../../../common/constants/modal';
import { logout } from '../../../services/usermanager';
import { useRouter } from 'vue-router';
const router = useRouter();
const removeModal = ref(false);

const fullName = ref(localStorage.getItem('fullName'));

const submit = async () => {
    const res = await logout();
    console.log(res);
};
</script>

<template>
    <div class="profile">
        <div class="profile__info">
            <div class="profile__image">
                <img src="@/assets/images/Avatar.png" :title="fullName" alt="avatar" />
            </div>
            <p class="profile__name">{{ fullName }}</p>
        </div>
        <div @click="() => (removeModal = true)" class="profile__icon">
            <BaseIcon path="homeIcon/logout.vue" />
        </div>
        <base-modal
            v-if="removeModal"
            is-warning
            :title="form.title"
            :button="form.button"
            @close="removeModal = false"
            @submit="submit"
        />
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
        @include mixins.flex(center, center, 30px);
    }
    &__name {
        font: typography.$font_subtitle1;
    }
    &__icon {
        transform: scale(1.5);
        margin-left: 15px;
        cursor: pointer;
    }
}
</style>
