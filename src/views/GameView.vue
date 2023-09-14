<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>

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
        const res = await fetch(`https://api.unsplash.com/photos/?client_id=${token}&page=1`)
        const resData = await res.json()
        this.photos = resData

    }
}
</script>

<style></style>