<script setup>
import BaseModal from '@base/BaseModal.vue';
import BaseTag from '@base/BaseTag.vue';
import { toast } from '@/plugins/toast';
import BaseIcon from '@base/BaseIcon.vue';
import { modalActivityType as data } from '@/common/constants/modal';
import { ref } from 'vue';
import { activityTypeStore } from '@/stores/activityTypeStore';
import { storeToRefs } from 'pinia';

const emits = defineEmits(['submit']);

const props = defineProps({
    activityTypes: {
        type: Array
    }
});

const { titleActivityTypes } = storeToRefs(activityTypeStore());

const searchInput = ref();

const selectedActivityTypes = ref(props.activityTypes);

const selectActivityType = () => {
    if (!titleActivityTypes.value?.includes(searchInput.value))
        toast.error('نوع فعالیت انتخابی وجود ندارد');
    else if (selectedActivityTypes.value?.includes(searchInput.value))
        toast.error('نوع فعالیت انتخابی تکراری است');
    else selectedActivityTypes.value.push(searchInput.value);
    searchInput.value = '';
};

const onSubmit = () => {
    selectedActivityTypes.value?.length == 0
        ? toast.error('نوع فعالیتی انتخاب نکردید')
        : emits('submit', selectedActivityTypes.value);
};
</script>

<template>
    <base-modal @submit="onSubmit" :title="data?.title" :button="data?.button" class="modal">
        <div class="search-input">
            <BaseIcon path="modalIcons/iconSearch.vue" class="search-input__icon" />
            <input
                v-model="searchInput"
                type="search"
                list="activityTypes"
                class="search-input__input"
                name="activityTypes"
                placeholder="جستجوی فعالیت"
                spellcheck="false"
            />
            <datalist id="activityTypes">
                <option
                    v-for="(activityType, index) in titleActivityTypes"
                    :key="index"
                    :value="activityType"
                >
                    {{ activityType }}
                </option>
            </datalist>
            <BaseIcon path="modalIcons/iconAddTag.vue" @click="selectActivityType" />
        </div>
        <div class="modal__list">
            <BaseTag
                v-for="(activityType, index) in selectedActivityTypes"
                :key="index"
                :text="activityType"
                is-active
            />
        </div>
    </base-modal>
</template>

<style scoped lang="scss">
.modal {
    &__list {
        @include mixins.flex(flex-start, $gap: 8px, $wrap: wrap);
        margin-bottom: 30px;
    }
}
</style>
