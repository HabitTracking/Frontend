<script setup>
import DatePicker from 'vue3-persian-datetime-picker';
import BaseInput from '@/components/base/BaseInput.vue';
import {useField} from 'vee-validate';
import {computed} from 'vue';

const props = defineProps({
    dataInput: {
        type: Object,
        required: true
    },
    type: String
});

const {value} = useField(props.dataInput?.name);

const format = computed(() => (props.type === 'date' ? 'jD jMMMM jYYYY' : 'HH:mm'));
</script>

<template>
    <BaseInput
      :class="dataInput.name"
      :data="dataInput"
    />

    <DatePicker
      convertNumbers
      :type="type"
      :custom-input="`.${dataInput.name}`"
      :format="format"
      class="date-picker"
      color="#b46200"
      v-model="value"
    />
</template>
