<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>
        <p v-if="isLoading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else="hasPhotos">
            <div class="grid">
                <div v-for="photo in photos" :key="photo.id">
                    <GameImage :photo="photo" :select-photo="selectPhoto" :is-selected="isSelected(photo.id)" />
                </div>
            </div>
        </div>

        <button @click="handleLogout">Log out</button>
        <router-link to="/game/leaderboard">Leaderboard</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import GameImage from '../components/GameView/GameImage.vue'
import { useUserState } from '../store/user'
import { useLeaderboardState } from '../store/leaderboard'
import { getPhotos } from '../services/photos'
import { useGameState } from '../store/game'

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

    created() {
        const userState = useUserState()
        if (userState.username === '') {
            this.$router.push('/')
        } else {
            this.fetchPhotos()
        }

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

        handleLogout() {
            const userState = useUserState()

            userState.logoutUser();
            this.$router.push('/');
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

        },

        navigate(path) {
            this.$router.push({ path });
        }
    },

    watch: {
        photos(newState) {
            const leaderboardState = useLeaderboardState()
            const gameState = useGameState()
            const isAllMatched = newState.length && newState.every(photo => photo.isMatched === true)



            if (isAllMatched) {
                gameState.setGame({ isFinished: true, photos: newState })
                leaderboardState.setList([...leaderboardState.list, this.user])
                this.navigate('/game/leaderboard')
            } else {
                gameState.setGame({
                    photos: newState,
                    isFinished: false
                })
            }
        },
        selectedPhotos() {
            const [firstPhotoPick, secondPhotoPick] = this.selectedPhotos

            if (firstPhotoPick && secondPhotoPick && firstPhotoPick.url === secondPhotoPick.url && firstPhotoPick.id !== secondPhotoPick.id) {
                const filteredFotos = this.photos.map(photo => {
                    if (photo.id === firstPhotoPick.id || photo.id === secondPhotoPick.id) {
                        return { ...photo, isMatched: true }
                    } else {
                        return photo
                    }
                })

                this.photos = filteredFotos
            }

            if (firstPhotoPick && secondPhotoPick) {
                setTimeout(() => {
                    this.selectedPhotos = []
                }, 300)
            }
        },
    },

    components: {
        GameImage
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