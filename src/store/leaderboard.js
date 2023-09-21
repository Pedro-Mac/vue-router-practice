import { defineStore } from 'pinia'

export const useLeaderboardState = defineStore("leaderboard", {
    state: () => ({
        list: []
    }),

    actions: {
        setList(value){
            this.list = value
            localStorage.setItem("leaderboardList", JSON.stringify(value))
        },

        getList(){
            const list = JSON.parse(localStorage.getItem("leaderboardList"))

            
            if(list) {
                this.list = list;
                return list
            }
        },

        clearList() {
            this.list = []
            localStorage.removeItem("leaderboardList")
        }
    }
})