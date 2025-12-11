import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BookDetailView from '@/views/BookDetailView.vue'
import BookFormView from '@/views/BookFormView.vue'

// Configuração de rotas:
// /             - Homepage com lista, pesquisa, filtros e paginação
// /books/new    - Formulário para criar novo livro
// /books/:id    - Página de detalhe do livro
// /books/:id/edit - Formulário para editar (reutiliza BookFormView)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Library System',
    },
  },
  {
    path: '/books/new',
    name: 'book-create',
    component: BookFormView,
    meta: {
      title: 'Add New Book',
    },
  },
  {
    path: '/books/:id',
    name: 'book-detail',
    component: BookDetailView,
    meta: {
      title: 'Book Details',
    },
  },
  {
    path: '/books/:id/edit',
    name: 'book-edit',
    component: BookFormView,
    meta: {
      title: 'Edit Book',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard para atualizar o título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Library System'
  next()
})

export default router