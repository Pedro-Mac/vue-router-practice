
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import LeaderboardView from '../views/Leaderboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/game', 
    name: 'game', 
    component: GameView, 
    children: [{
      path: '/game/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView
    }] },
    { path: '/', name: 'home', component: HomeView },
  ]
})

export default router

