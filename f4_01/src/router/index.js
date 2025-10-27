import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HomeView.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../components/ProjectsView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../components/ContactView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
