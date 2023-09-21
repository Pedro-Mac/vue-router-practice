<template>
    <v-dialog width="500" v-model="a">
        <v-card title="Dialog">
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            a: true
        }
    },
    components: {
        Modal
    }
}
</script>

<style lang="scss" scoped></style>