<template>
    <div class="container" @click="selectPhoto(photo)">
        <img :src="photo.src.tiny" :alt="photo.alt_description">
        <div :class="(isMatched || isSelected) ? '' : 'backside'"></div>
    </div>
</template>

<script>
export default {
    props: ['photo', 'selectPhoto', 'isSelected'],

    computed: {
        isMatched() {
            return this.photo.isMatched
        },
    },
}
</script>

<style>
.container {
    position: relative;
}

.backside {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: aliceblue;
}
</style>