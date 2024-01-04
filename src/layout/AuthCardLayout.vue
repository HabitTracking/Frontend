<script setup></script>

<template>
    <div class="auth-card">
        <div class="auth-card__form">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-card {
    background: url(../assets/images/bg.jpg);
    background-position: center;
    // background-color: ;
    mix-blend-mode: multiply;
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100vh;

    @include mixins.screen(small) {
        width: 100%;
        height: 100%;
        margin-inline: auto;
        padding: 20px 30px;
    }

    &__form {
        background-color: rgba(255, 255, 255, 0.531);
        backdrop-filter: blur(10px);
        width: 536px;
        border-radius: 24px;
        box-shadow: variables.$shadow;
        position: relative;
        font: typography.$font_subtitle1;
        color: variables.$gray900;
        padding: 36px 20px;
        @include mixins.screen(small) {
            padding-inline: 5%;
        }
    }
}
</style>
