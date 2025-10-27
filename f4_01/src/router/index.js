import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../view/HomeView.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../view/ProjectsView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../view/ContactView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
