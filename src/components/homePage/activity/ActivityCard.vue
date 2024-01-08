<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import BaseIcon from '@base/BaseIcon.vue';
import { ref } from 'vue';
import FormAction from '@/components/modals/FormAction.vue';
import { removeActivity, progressActivity } from '@/common/constants/modal';
import { activityForm } from '@/common/constants/forms';
import { schemaActivity as schema } from '@/plugins/yup';
import Activity from './Activity';
import BaseInput from '../../base/BaseInput.vue';
import { Form as ValidationForm } from 'vee-validate';
import { schemaProgress } from '@/plugins/yup';

const props = defineProps({
    data: {
        type: Activity,
        required: true
    }
});

const menuShown = ref(false);

const removeModal = ref(false);
const editModal = ref(false);

const progressModal = ref(false);

const disappearMenu = () => {
    menuShown.value = false;
    removeModal.value = false;
    editModal.value = false;
};
const onSubmitProgress = value => {
    props.data.progress(value.amount);
    progressModal.value = false;
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

function openProgress() {
    progressModal.value = true;
}

const formInput = { name: 'amount', type: 'text', label: 'مقدار هدف', headingIcon: 'iconNote' };
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
        <div class="card__description">
            {{ data?.description }}
        </div>
        <div class="card__footer footer">
            <div class="footer__date">
                <BaseIcon path="cardIcon/iconCalendar.vue" />
                {{ data?.getDate() }} تا {{ data?.getDueDate() }}
            </div>
            <div class="footer__duration">
                <BaseIcon path="cardIcon/iconTime.vue" />
                {{ data.getTime() }}
            </div>
        </div>
        <div class="card__tags">
            <BaseTag class="card__tag" :text="data.activityType" is-active theme="red" />
            <BaseTag class="card__tag" :text="data.getTag()" is-active theme="violet" />
            <BaseTag
                class="card__tag"
                text="افزودن پیشترفت"
                is-active
                theme="blue"
                @click="openProgress()"
            />
        </div>
    </div>
    <div v-if="menuShown" class="overlay" @click="menuShown = false"></div>

    <form-action
        v-if="editModal"
        :data="activityForm"
        :schema="schema"
        :value="data.getData()"
        @close="editModal = false"
        @submit="submitEdit"
    />

    <base-modal
        v-if="removeModal"
        is-warning
        :title="removeActivity.title"
        :button="removeActivity.button"
        @close="removeModal = false"
        @submit="submitRemove"
    />

    <ValidationForm
        v-if="progressModal"
        @submit="onSubmitProgress"
        :validation-schema="schemaProgress"
    >
        <BaseModal
            title="افزودن پیشترفت"
            :button="progressActivity.button"
            @close="progressModal = false"
        >
            <div class="">
                <BaseInput :data="formInput" />
            </div>
        </BaseModal>
    </ValidationForm>
</template>

<style scoped lang="scss">
.card {
    max-height: 480px;
    &__description {
        height: 100px;
    }
    &__tags {
        @include mixins.flex(flex-start, center, 8px);
    }
}
</style>
