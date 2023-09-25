import { defineStore } from 'pinia'

export const useGameState = defineStore("game", {
    state: () => ({
        game: null
    }),

    actions: {
        setGame(value){
            this.game = value
            localStorage.setItem("game", JSON.stringify(value))
        },

        getGame(){
            const game = JSON.parse(localStorage.getItem("game"))

            
            if(game) {
                this.game = game;
                return game
            }
        },
    }
})