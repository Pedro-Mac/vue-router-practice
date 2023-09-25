<template>
    <v-dialog width="500" v-model="isOpen">
        <v-card title="Dialog">
            <ul>
                <li v-for="item in list" :key="item.username">
                    {{ item.username }}
                </li>
            </ul>

            <v-btn v-if="isFinished">
                Start new game
            </v-btn>
        </v-card>

    </v-dialog>
</template>

<script>
import { useLeaderboardState } from '../store/leaderboard';
import { useGameState } from '../store/game';


export default {
    data() {
        return {
            isOpen: true,
            list: [],
            game: null
        }
    },

    created() {
        this.list = useLeaderboardState().getList()
        this.game = useGameState().getGame()
    },

    computed: {
        isFinished() {
            return Boolean(this.game?.isFinished)
        }
    },

    watch: {
        isOpen(newVal, oldVal) {
            if (newVal === false) this.$router.push('/game')
        }
    }
}
</script>

<style lang="scss" scoped></style>