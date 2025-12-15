// Store Pinia para gestão centralizada de pratos
import { defineStore } from 'pinia'
import {
  getDishes,
  getDishesCategory,
  createDish,
  updateDish,
  deleteDish,
} from '@/api/dishes'

export const useDishesStore = defineStore('dishes', {
  state: () => ({
    dishes: [],
    activeCategory: null,
    isLoading: false,
    isUpdating: false,
    error: null,
  }),

  getters: {
    // Retorna a lista filtrada pela categoria ativa
    filteredDishes(state) {
      if (!state.activeCategory) {
        return state.dishes
      }
      return state.dishes.filter((dish) => dish.category === state.activeCategory)
    },
  },

  actions: {
    // Carrega todos os pratos do menu
    async loadAllDishes() {
      this.isLoading = true
      this.error = null

      try {
        this.dishes = await getDishes()
        this.activeCategory = null
      } catch (err) {
        console.error('Erro ao carregar pratos:', err)
        this.error = 'Não foi possível carregar os pratos.'
        this.dishes = []
      } finally {
        this.isLoading = false
      }
    },

    // Carrega pratos filtrados por categoria
    async loadDishesByCategory(category) {
      this.isLoading = true
      this.error = null
      this.activeCategory = category || null

      try {
        this.dishes = category ? await getDishesCategory(category) : await getDishes()
      } catch (err) {
        console.error('Erro ao carregar pratos por categoria:', err)
        this.error = 'Não foi possível carregar os pratos.'
        this.dishes = []
      } finally {
        this.isLoading = false
      }
    },

    // Cria um novo prato e adiciona-o ao estado local
    async createNewDish(payload) {
      this.isUpdating = true
      this.error = null

      try {
        const createdDish = await createDish(payload)
        this.dishes.push(createdDish)
        return createdDish
      } catch (err) {
        console.error('Erro ao criar prato:', err)
        this.error = 'Não foi possível criar o prato.'
        throw err
      } finally {
        this.isUpdating = false
      }
    },

    // Remove prato do menu com fallback em caso de erro
    async removeDish(id) {
      this.isUpdating = true
      this.error = null

      const originalDishes = [...this.dishes]
      this.dishes = this.dishes.filter((dish) => String(dish.id) !== String(id))

      try {
        await deleteDish(id)
        return true
      } catch (err) {
        console.error('Erro ao remover prato:', err)
        this.error = 'Não foi possível remover o prato.'
        this.dishes = originalDishes
        return false
      } finally {
        this.isUpdating = false
      }
    },

    // Alterna disponibilidade do prato com atualização remota
    async toggleDishAvailability(id) {
      const dishIndex = this.dishes.findIndex((dish) => String(dish.id) === String(id))
      if (dishIndex === -1) {
        return false
      }

      this.isUpdating = true
      this.error = null

      const originalDish = { ...this.dishes[dishIndex] }
      const updatedPayload = { ...originalDish, available: !originalDish.available }
      this.dishes.splice(dishIndex, 1, updatedPayload)

      try {
        const updatedDish = await updateDish(id, updatedPayload)
        this.dishes.splice(dishIndex, 1, updatedDish)
        return true
      } catch (err) {
        console.error('Erro ao actualizar disponibilidade:', err)
        this.error = 'Não foi possível actualizar o prato.'
        this.dishes.splice(dishIndex, 1, originalDish)
        return false
      } finally {
        this.isUpdating = false
      }
    },
  },
})