<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>
        <div v-if="hasPhotos">
            <div v-for="photo in photos" :key="photo.id" class="">
                <img :src="photo.urls.small" :alt="photo.alt_description">
            </div>
        </div>

    </div>
</template>

<script>
import { useUserState } from '../store/user'
const token = import.meta.env.VITE_UNSPLASH_KEY

export default {
    data() {
        return {
            user: useUserState(),
            photos: [],
        }
    },

    async created() {
        const res = await fetch(`https://api.unsplash.com/photos/?client_id=${token}&page=${Math.ceil(Math.random() * 10)}&per_page=4&orientation=portrait`)
        const resData = await res.json()
        this.photos = [...resData, ...resData]

    },

    computed: {
        hasPhotos() {
            return this.photos.length > 0
        }
    }
}
</script>

<style></style>