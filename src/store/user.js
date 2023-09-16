import { defineStore } from 'pinia'

export const useUserState = defineStore("user", {
    state: () => ({
        username: ""
    }),

    actions: {
        setUsername(value){
            this.username = value
            localStorage.setItem("username", value)
        },

        getUsername(){
            const username = localStorage.getItem("username")

            if(username) {
                this.username = username;
                return username
            }
        },

        logoutUser(){
            this.username = ""
            localStorage.removeItem("username")
        }
    }
})