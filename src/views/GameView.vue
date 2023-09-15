<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>
        <div v-if="hasPhotos">
            <div class="grid">
                <div v-for="photo in photos" :key="photo.id" class="photo-container">
                    <img :src="photo.urls.small" :alt="photo.alt_description">
                </div>
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
        const res = await fetch(`https://api.unsplash.com/photos/?client_id=${token}&page=${Math.ceil(Math.random() * 10)}&per_page=4&orientation=portrait&w=240&h=320&fit=crop`)
        const resData = await res.json()
        this.photos = this.shufflePhotos([...resData, ...resData.map(photo => ({ ...photo, id: photo.id.split("").reverse().join("") }))])

    },

    computed: {
        hasPhotos() {
            return this.photos.length > 0
        }
    },

    methods: {
        shufflePhotos(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            return arr
        }
    }
}
</script>

<style>
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
}

.photo-container {
    width: 240px;
    height: 320px;
}
</style>