import { createRouter, createWebHistory } from 'vue-router'
import DishListView from '@/views/DishListView.vue'
import DishCreateView from '@/views/DishCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dishes',
      component: DishListView,
    },
    {
      path: '/dishes/create',
      name: 'dish-create',
      component: DishCreateView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
