<script setup>
import {Field} from 'vee-validate';
import {onMounted, ref} from 'vue';
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel';
import BaseIcon from '@base/BaseIcon.vue';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({
    files: Array
});

const srcImages = ref([]);

onMounted(() => {
    props.files?.forEach(file => {
        base64Image(file);
    });
});

const base64Image = async fileObject => {
    const renderFile = new FileReader();

    renderFile.onload = e => {
        srcImages.value.push(e.target.result);
    };
    renderFile.readAsDataURL(await fileObject);
};

const handleImage = e => {
    const file = e.target.files[0];
    const blob = URL.createObjectURL(file);
    URL.srcImages.value.push(blob);
};

const countSource = () =>
    srcImages.value.length >= 3 ? srcImages.value.length + 1 : 3;

</script>
<template>
    <div class="carousel">
        <Carousel :items-to-show="3">
            <Slide
              v-for="index in countSource()"
              :key="index"
            >
                <div class="carousel__item item">
                    <Field
                      :name="`images[${index - 1}]`"
                      class="item__input"
                      @input="handleImage($event, index - 1)"
                      type="file"
                    />
                    <div
                      v-if="srcImages[index - 1]"
                      class="item__box"
                    >
                        <img
                          class="item__image"
                          :src="srcImages[index - 1]"
                          alt="uploaded image"
                        />
                    </div>
                    <div
                      class="item__button"
                      @click="srcImages.splice(index - 1, 1)"
                    >
                        <BaseIcon
                          path="modalIcons/iconCancelFilter.vue"
                          class="item__icon"
                        />
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>

<style scoped lang="scss">
.carousel {
    &__item {
        @include mixins.base-card;
        min-height: 96px;
        width: 96px;
        position: relative;
        color: variables.$gray900;
        font-size: 20px;
        @include mixins.flex(center);

        .item {
            &__input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            }

            &__box {
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 100%;

                &:hover~.button {
                    @include mixins.flex();
                }
            }

            &__image {
                width: 100%;
                height: 100%;
                border-radius: 24px;
                border: none;
            }

            &__button {
                width: 20px;
                height: 20px;
                background-color: rgba(0, 0, 0, 0.25);
                @include mixins.absolute(10px, $left: 10px);
                display: none;
                color: variables.$bgLightdefault;
                z-index: 3;
                border-radius: 10px;
                padding: 3px;
            }

            &__icon {
                fill: themes.$error700;
            }
        }
    }
}</style>
