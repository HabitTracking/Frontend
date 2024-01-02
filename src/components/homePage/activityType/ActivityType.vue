<template>
    <div class="header">
        <h6>نوع فعالیت</h6>
    </div>
    <ul class="list">
        <li v-for="index in 4" :key="index" class="list__card">
            <div class="list__card--empty"></div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.header {
    margin-bottom: 16px;
}
.list {
    @include mixins.flex(space-between, center, 20px);
    &__card {
        min-height: 110px;

        &--empty {
            @include mixins.base-card;
        }
    }
}
</style>
