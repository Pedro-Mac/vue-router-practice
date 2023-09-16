<template>
    <form>
        <div class="flex-col">
            <label for="name">Enter your name</label>
            <input id="name" type="text" placeholder="Enter your name" v-model="username" />
        </div>
        <button @click.prevent="startGame">Start game</button>
    </form>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserState } from '../store/user'

export default {
    data() {
        return {
            username: ""
        }
    },

    created() {
        const userState = useUserState()
        const username = userState.logoutUser()

        if (username) this.$router.push("/game")
    },

    methods: {
        ...mapActions(useUserState, ['setUsername']),
        ...mapActions(useUserState, ['getUsername']),
        ...mapActions(useUserState, ['logoutUser']),

        startGame() {
            this.setUsername(this.username)
            this.$router.push("/game")
        }
    }
}
</script>

<style scoped>
.flex-col {
    display: flex;
    flex-direction: column;
}
</style>