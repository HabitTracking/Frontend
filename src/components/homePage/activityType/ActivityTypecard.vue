<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import BaseIcon from '@base/BaseIcon.vue';
import { ref } from 'vue';
import { removeActivityType } from '@/common/constants/modal';
import ActivityType from './ActivityType';
import ActivityTypeForm from '../../modals/ActivityTypeForm.vue';

const props = defineProps({
    data: {
        type: ActivityType,
        required: true
    }
});

const menuShown = ref(false);

const removeModal = ref(false);
const editModal = ref(false);

const disappearMenu = () => {
    menuShown.value = false;
    removeModal.value = false;
    editModal.value = false;
};

const edit = () => {
    menuShown.value = false;
    editModal.value = true;
};
const remove = () => {
    menuShown.value = false;
    removeModal.value = true;
};

const submitEdit = values => {
    disappearMenu();
    props.data.editActivity(values);
};
const submitRemove = () => {
    disappearMenu();
    props.data.deleteActivity();
};
</script>

<template>
    <div class="card" :class="{ 'card--menu': menuShown }" @click.self="menuShown = false">
        <div class="card__header">
            <h6 class="card__title">{{ data?.title }}</h6>
            <div class="card__more" @click="menuShown = true">
                <span v-for="n in 3" :key="n"></span>
                <div v-if="menuShown" class="dropdown">
                    <div class="dropdown__item" @click="edit">
                        <BaseIcon path="cardIcon/iconEdit.vue" class="dropdown__icon" />
                        ویرایش
                    </div>
                    <div class="dropdown__item" @click="remove">
                        <BaseIcon path="cardIcon/iconDelete.vue" class="dropdown__icon" />
                        حذف
                    </div>
                </div>
            </div>
        </div>
        <div class="card__description"></div>
    </div>
    <div v-if="menuShown" class="overlay" @click="menuShown = false"></div>

    <ActivityTypeForm
        v-if="editModal"
        :value="data.getData()"
        @close="() => (editModal = false)"
        @submit="submitEdit"
    />

    <base-modal
        v-if="removeModal"
        is-warning
        :title="removeActivityType.title"
        :button="removeActivityType.button"
        @close="() => (removeModal = false)"
        @submit="submitRemove"
    />
</template>

<style scoped lang="scss">
.card {
    max-height: 480px;
    &__description {
        height: 100px;
    }
}
</style>
