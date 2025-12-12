import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RandomCocktailView from '../views/RandomCocktailView.vue'
import CocktailDetailView from '../views/CocktailDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/discover',
      name: 'discover',
      component: RandomCocktailView,
    },
    {
      path: '/cocktail/:id',
      name: 'detail',
      component: CocktailDetailView,
    },
  ],
})

export default router
