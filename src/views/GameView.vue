<template>
    <div>
        <p v-if="user.username">{{ user.username }}</p>
        this is the game page
    </div>
</template>

<script>
import { useUserState } from '../store/user'

export default {
    data() {
        return {
            user: useUserState()
        }
    }
}
</script>

<style></style>