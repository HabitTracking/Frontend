<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseTag from '@base/BaseTag.vue';
import { modalActivityType as data } from '@/common/constants/modal';
import { ref } from 'vue';
import { activityTypeStore } from '@/stores/activityTypeStore';
import { useField } from 'vee-validate';

const emits = defineEmits(['submit']);

const selected = ref();
const { value: inputValue } = useField('activityType');

const store = activityTypeStore();

const selectActivityType = activityType => {
    selected.value = activityType
};

const onSubmit = () => {
    inputValue.value = selected.value.title;
    emits('submit', selected.value);
};
</script>

<template>
    <base-modal @submit="onSubmit" :title="data?.title" :button="data?.button" class="modal">
        <div class="modal__list">
            <BaseTag
                v-for="(activityType, index) in store.activityTypes"
                :key="index"
                :text="activityType.title"
                :is-active="activityType.title == selected?.title"
                @click="selectActivityType(activityType)"
            />
        </div>
    </base-modal>
</template>

<style scoped lang="scss">
.modal {
    &__list {
        @include mixins.flex($gap: 8px, $wrap: wrap);
        justify-content: center;
        margin-bottom: 30px;
    }
}
</style>
