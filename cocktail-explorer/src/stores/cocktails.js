import { defineStore } from 'pinia'
import {
  getRandomCocktail,
  getCocktailById,
  searchCocktails,
  getCocktailsByCategory,
  getCategories,
} from '../../api/api.js'

export const useCocktailsStore = defineStore('cocktails', {
  state: () => ({
    // Lista de cocktails para a homepage
    cocktails: [],
    // Cocktail atualmente selecionado (para página de detalhes)
    currentCocktail: null,
    // Lista de categorias disponíveis
    categories: [],
    // Estado de carregamento
    loading: false,
    // Mensagem de erro
    error: null,
  }),

  getters: {
    /**
     * Processa o cocktail atual e retorna um array limpo de ingredientes,
     * combinando cada ingrediente com a sua medida correspondente.
     * A API retorna ingredientes em campos separados (strIngredient1, strIngredient2, ... até strIngredient15).
     * As medidas seguem o mesmo padrão (strMeasure1, strMeasure2, etc.).
     *
     * @returns {Array<{ingredient: string, measure: string}>}
     * Exemplo: [
     *   { ingredient: "Tequila", measure: "1 1/2 oz" },
     *   { ingredient: "Triple sec", measure: "1/2 oz" },
     *   { ingredient: "Lime juice", measure: "1 oz" }
     * ]
     */
    ingredients: (state) => {
      if (!state.currentCocktail) {
        return []
      }

      const ingredientsList = []

      // A API suporta até 15 ingredientes
      for (let i = 1; i <= 15; i++) {
        const ingredient = state.currentCocktail[`strIngredient${i}`]
        const measure = state.currentCocktail[`strMeasure${i}`]

        // Só adiciona se o ingrediente não for null/undefined/vazio
        if (ingredient && ingredient.trim()) {
          ingredientsList.push({
            ingredient: ingredient.trim(),
            measure: measure ? measure.trim() : '',
          })
        }
      }

      return ingredientsList
    },

    /**
     * Verifica se há cocktails carregados
     * @returns {boolean}
     */
    hasCocktails: (state) => {
      return state.cocktails.length > 0
    },

    /**
     * Verifica se ocorreu algum erro
     * @returns {boolean}
     */
    hasError: (state) => {
      return state.error !== null
    },
  },

  actions: {
    /**
     * Carrega cocktails por categoria
     * @param {string} category - Nome da categoria
     */
    async loadCocktailsByCategory(category) {
      this.loading = true
      this.error = null

      try {
        const data = await getCocktailsByCategory(category)
        this.cocktails = data
      } catch (err) {
        this.error = `Failed to load cocktails by category: ${err.message}`
        this.cocktails = []
      } finally {
        this.loading = false
      }
    },

    /**
     * Carrega detalhes de um cocktail por ID
     * @param {string} id - ID do cocktail
     */
    async loadCocktailById(id) {
      this.loading = true
      this.error = null

      try {
        const data = await getCocktailById(id)

        if (data) {
          this.currentCocktail = data
        } else {
          this.error = 'Cocktail not found'
          this.currentCocktail = null
        }
      } catch (err) {
        this.error = `Failed to load cocktail details: ${err.message}`
        this.currentCocktail = null
      } finally {
        this.loading = false
      }
    },

    /**
     * Carrega um cocktail aleatório
     */
    async loadRandomCocktail() {
      this.loading = true
      this.error = null

      try {
        const data = await getRandomCocktail()

        if (data) {
          this.currentCocktail = data
        } else {
          this.error = 'Failed to load random cocktail'
          this.currentCocktail = null
        }
      } catch (err) {
        this.error = `Failed to load random cocktail: ${err.message}`
        this.currentCocktail = null
      } finally {
        this.loading = false
      }
    },

    /**
     * Carrega lista de categorias
     */
    async loadCategories() {
      this.loading = true
      this.error = null

      try {
        const data = await getCategories()
        this.categories = data
      } catch (err) {
        this.error = `Failed to load categories: ${err.message}`
        this.categories = []
      } finally {
        this.loading = false
      }
    },

    /**
     * Pesquisa cocktails por nome
     * @param {string} query - Termo de pesquisa
     */
    async searchCocktailsByName(query) {
      this.loading = true
      this.error = null

      try {
        const data = await searchCocktails(query)
        this.cocktails = data
      } catch (err) {
        this.error = `Failed to search cocktails: ${err.message}`
        this.cocktails = []
      } finally {
        this.loading = false
      }
    },

    /**
     * Limpa o erro atual
     */
    clearError() {
      this.error = null
    },

    /**
     * Limpa o cocktail atual
     */
    clearCurrentCocktail() {
      this.currentCocktail = null
    },

    /**
     * Limpa a lista de cocktails
     */
    clearCocktails() {
      this.cocktails = []
    },
  },
})
