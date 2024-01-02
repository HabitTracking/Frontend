<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import BaseTag from '@/components/base/BaseTag.vue';
import BaseIcon from '@base/BaseIcon.vue';
import { ref, onMounted } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import FormAction from '@/components/modals/FormAction.vue';
import { removeActivity } from '@/common/constants/modal';
import { activityForm } from '@/common/constants/forms';
import { schemaActivity as schema } from '@/plugins/yup';
import Activity from './Activity';

const props = defineProps({
    data: {
        type: Activity,
        required: true
    }
});

const menuShown = ref(false);

const removeModal = ref(false);
const editModal = ref(false);

const srcImages = ref([]);

onMounted(() => {
    props.data?.images?.forEach(async image => {
        const renderFile = new FileReader();
        renderFile.onload = () => {
            srcImages.value.push(renderFile.result);
        };
        renderFile.readAsDataURL(await image);
    });
});

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
        <div class="card__carousel">
            <Carousel>
                <Slide v-for="(image, index) in srcImages" :key="index">
                    <img :src="image" alt="image activity" />
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>
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
                {{ data.getDate() }}
            </div>
            <div class="footer__duration">
                <BaseIcon path="cardIcon/iconTime.vue" />
                {{ data?.getStartTime() }} تا {{ data?.getEndTime() }}
            </div>
        </div>
        <BaseTag class="card__tag" :text="data.activityType" is-active theme="red" />
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
</template>

<style scoped lang="scss">
.card {
    max-height: 480px;
    &__description {
        height: 100px;
    }
}
</style>
