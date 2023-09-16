<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>
        <p v-if="isLoading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else="hasPhotos">
            <div class="grid">
                <div v-for="photo in photos" :key="photo.id">
                    <p v-if="photo.isMatched">Is matched</p>
                    <p v-else-if="isSelected(photo.id)">Is selected</p>
                    <img :src="photo.src.tiny" :alt="photo.alt_description" @click="selectPhoto(photo)">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useUserState } from '../store/user'
import { getPhotos } from '../services/photos'

export default {
    data() {
        return {
            user: useUserState(),
            photos: [],
            isLoading: false,
            error: '',
            selectedPhotos: [],
        }
    },

    mounted() {
        this.fetchPhotos()
    },

    computed: {
        hasPhotos() {
            return this.photos.length > 0
        },

    },
    methods: {
        isSelected(id) {
            return this.selectedPhotos.some(photo => photo.id === id)
        },
        shufflePhotos(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            return arr
        },

        fetchPhotos() {
            this.isLoading = true
            this.error = ''

            getPhotos()
                .then(({ photos }) => {
                    const shuffledPhotos = this.shufflePhotos([...photos, ...photos.map(photo => ({ ...photo, id: photo?.id.toString().split("").reverse().join("") }))])
                    this.photos = shuffledPhotos.map(item => ({ ...item, isMatched: false }));
                })
                .catch(error => {
                    this.error = error.message
                })
                .finally(() => {
                    this.isLoading = false
                })
        },

        selectPhoto(photo) {
            if (this.selectedPhotos.length === 0) {
                this.selectedPhotos = [photo]
            } else if (this.selectedPhotos.length === 1) {
                this.selectedPhotos = [...this.selectedPhotos, photo]
            }

        }
    },

    watch: {
        selectedPhotos() {
            const [firstPhotoPick, secondPhotoPick] = this.selectedPhotos

            if (firstPhotoPick && secondPhotoPick && firstPhotoPick.url === secondPhotoPick.url) {
                const filteredFotos = this.photos.map(photo => {
                    if (photo.id === firstPhotoPick.id || photo.id === secondPhotoPick.id) {
                        return { ...photo, isMatched: true }
                    } else {
                        return photo
                    }
                })

                this.photos = filteredFotos
            }

            if (firstPhotoPick && secondPhotoPick) this.selectedPhotos = []
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
</style>