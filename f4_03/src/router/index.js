import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/ShopView.vue'),
    children: [
      { path: '', name: 'AllProducts', component: () => import('../views/AllProductsView.vue') },
      { path: 'category/:name', name: 'Category', component: () => import('../views/CategoryView.vue') },
    ],
  },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
