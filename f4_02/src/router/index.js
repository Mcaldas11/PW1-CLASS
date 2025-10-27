import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: () => import('../views/ArticleListView.vue'),
  },
  {
    path: '/articles/:id',
    name: 'Article',
    component: () => import('../views/ArticleView.vue'),
    props: false,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
