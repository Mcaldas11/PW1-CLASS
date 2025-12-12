import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'cocktail-explorer-favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  // Lista de IDs de cocktails marcados como favoritos
  const favorites = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  /**
   * Verifica se um cocktail é favorito
   * @param {string} id - ID do cocktail
   * @returns {boolean}
   */
  const isFavorite = computed(() => (id) => favorites.value.includes(id))

  /**
   * Obtém o número de favoritos
   * @returns {number}
   */
  const favoritesCount = computed(() => favorites.value.length)

  /**
   * Adiciona um cocktail aos favoritos
   * @param {string} id - ID do cocktail
   */
  function addFavorite(id) {
    if (!favorites.value.includes(id)) {
      favorites.value.push(id)
      saveFavorites()
    }
  }

  /**
   * Remove um cocktail dos favoritos
   * @param {string} id - ID do cocktail
   */
  function removeFavorite(id) {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
    }
  }

  /**
   * Alterna o status de favorito de um cocktail
   * @param {string} id - ID do cocktail
   */
  function toggleFavorite(id) {
    if (isFavorite.value(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  /**
   * Salva os favoritos no localStorage
   */
  function saveFavorites() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  /**
   * Limpa todos os favoritos
   */
  function clearFavorites() {
    favorites.value = []
    saveFavorites()
  }

  return {
    favorites,
    isFavorite,
    favoritesCount,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }
})
