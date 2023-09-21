<template>
    <v-dialog width="500" v-model="isOpen">
        <v-card title="Dialog">
            <ul>
                <li v-for="item in list" :key="item.username">
                    {{ item.username }}
                </li>
            </ul>
        </v-card>

    </v-dialog>
</template>

<script>
import { useLeaderboardState } from '../store/leaderboard';


export default {
    data() {
        return {
            isOpen: true,
            list: [],
        }
    },

    created() {
        this.list = useLeaderboardState().getList()
    },

    watch: {
        isOpen(newVal, oldVal) {
            if (newVal === false) this.$router.push('/game')
        }
    }
}
</script>

<style lang="scss" scoped></style>