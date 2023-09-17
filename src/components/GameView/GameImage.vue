<template>
    <div>
        <p v-if="photo.isMatched">Is matched</p>
        <p v-else-if="isSelected">Is selected</p>
        <img :src="photo.src.tiny" :alt="photo.alt_description" @click="selectPhoto(photo)">
    </div>
</template>

<script>
export default {
    props: ['photo', 'selectPhoto', 'isSelected']
}
</script>

<style></style>