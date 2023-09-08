import { defineStore } from 'pinia'

export const useUserState = defineStore("user", {
    state: () => ({
        username: ""
    }),

    actions: {
        setUsername(value){
            this.username = value
        }
    }
})