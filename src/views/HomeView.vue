<template>
  <main>
    <div v-if="userStore.username">
      {{ userStore.username }}
    </div>
    <GameStartForm />
  </main>
</template>

<script >
import GameStartForm from '../components/GameStartForm.vue';
import { useUserState } from '../store/user'



export default {
  data() {

    return {
      userStore: useUserState()

    }
  },
  components: {
    GameStartForm
  }
}

</script>
