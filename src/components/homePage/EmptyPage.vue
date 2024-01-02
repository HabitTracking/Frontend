<script setup>
defineProps({
    title: String
});
</script>

<template>
    <div class="box">
        <div class="box__image-container">
            <img class="box__image" src="../../assets/images/Empty.png" alt="background" />
        </div>
        <h5 class="box__title">{{ title }} ندارید.</h5>
        <p class="box__description">برای ایجاد {{ title }} جدید، روی + بزن</p>
    </div>
</template>

<style scoped lang="scss">
.box {
    margin-top: 103px;
    text-align: center;

    &__title {
        margin-right: 8px;
    }

    &__description {
        font: typography.$font_body2;
        color: variables.$gray500;
    }

    &__image {
        max-width: 350px;
        width: 100%;
    }
}
</style>
