<template>
  <div class="home-view">
    <header class="header">
      <h1>🍸 Cocktail Explorer</h1>
      <p class="subtitle">Discover amazing cocktails</p>
    </header>

    <div class="controls">
      <!-- Filtro por categoria -->
      <div class="filter-group">
        <label for="category-select">Category:</label>
        <select
          id="category-select"
          v-model="selectedCategory"
          @change="handleCategoryChange"
          :disabled="isSearchActive"
          class="category-select"
        >
          <option value="">All Cocktails</option>
          <option v-for="category in cocktailsStore.categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <span v-if="isSearchActive" class="search-active-badge">(search active)</span>
      </div>

      <!-- Pesquisa por nome -->
      <div class="search-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch" class="search-btn">Search</button>
        <button
          v-if="isSearchActive"
          @click="clearSearch"
          class="clear-search-btn"
          title="Clear search and return to category view"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Indicador de modo e contagem -->
    <div class="mode-indicator">
      {{ modeIndicator }}
    </div>

    <!-- Loading state -->
    <div v-if="cocktailsStore.loading" class="loading">
      <p>Loading cocktails...</p>
      <div class="spinner"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="cocktailsStore.error" class="error">
      <p>{{ cocktailsStore.error }}</p>
      <button @click="handleRetry" class="retry-btn">Try Again</button>
    </div>

    <!-- Empty state -->
    <div v-else-if="!cocktailsStore.hasCocktails" class="empty">
      <p>No cocktails found. Try a different search or category.</p>
    </div>

    <!-- Grid de cocktails -->
    <div v-else class="cocktails-grid">
      <CocktailCard
        v-for="cocktail in cocktailsStore.cocktails"
        :key="cocktail.idDrink"
        :cocktail="cocktail"
        @click="navigateToDetail"
      />
    </div>
  </div>
</template>

<script>
import { useCocktailsStore } from '../stores/cocktails.js'
import CocktailCard from '../components/CocktailCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',

  components: {
    CocktailCard,
  },

  setup() {
    const cocktailsStore = useCocktailsStore()
    const router = useRouter()

    const selectedCategory = ref('')
    const searchQuery = ref('')
    const isSearchActive = ref(false)

    // Carrega categorias ao montar
    onMounted(async () => {
      await cocktailsStore.loadCategories()
      // Carrega cocktails da primeira categoria por defeito
      if (cocktailsStore.categories.length > 0) {
        selectedCategory.value = cocktailsStore.categories[0]
        await cocktailsStore.loadCocktailsByCategory(selectedCategory.value)
      }
    })

    const handleCategoryChange = async () => {
      isSearchActive.value = false
      searchQuery.value = ''
      cocktailsStore.clearError()
      await cocktailsStore.loadCocktailsByCategory(selectedCategory.value)
    }

    const handleSearch = async () => {
      if (!searchQuery.value.trim()) return

      isSearchActive.value = true
      cocktailsStore.clearError()
      await cocktailsStore.searchCocktailsByName(searchQuery.value)
    }

    const clearSearch = async () => {
      isSearchActive.value = false
      searchQuery.value = ''
      cocktailsStore.clearError()
      await cocktailsStore.loadCocktailsByCategory(selectedCategory.value)
    }

    const handleRetry = async () => {
      if (isSearchActive.value) {
        await handleSearch()
      } else {
        await handleCategoryChange()
      }
    }

    const navigateToDetail = (cocktail) => {
      router.push({
        name: 'detail',
        params: { id: cocktail.idDrink },
      })
    }

    const modeIndicator = computed(() => {
      if (isSearchActive.value) {
        const count = cocktailsStore.cocktails.length
        return `Results for "${searchQuery.value}" (${count} found)`
      } else {
        const categoryName = selectedCategory.value || 'All Cocktails'
        const count = cocktailsStore.cocktails.length
        return `Category: ${categoryName} (${count} cocktails)`
      }
    })

    return {
      cocktailsStore,
      selectedCategory,
      searchQuery,
      isSearchActive,
      handleCategoryChange,
      handleSearch,
      clearSearch,
      handleRetry,
      navigateToDetail,
      modeIndicator,
    }
  },
}
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  color: #333;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group,
.search-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 600;
  color: #333;
}

.category-select {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.category-select:hover:not(:disabled) {
  border-color: #ff6b6b;
}

.category-select:focus {
  outline: none;
  border-color: #ff6b6b;
}

.category-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-active-badge {
  font-size: 0.9rem;
  color: #ff6b6b;
  font-weight: 600;
  padding: 5px 10px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 4px;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #ff6b6b;
}

.search-btn,
.clear-search-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn {
  background: #ff6b6b;
  color: white;
}

.search-btn:hover {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);
}

.clear-search-btn {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.clear-search-btn:hover {
  background: #e0e0e0;
}

.mode-indicator {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  font-weight: 600;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 60px 20px;
}

.loading p,
.error p,
.empty p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  color: #d32f2f;
}

.retry-btn {
  padding: 10px 30px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

.cocktails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group,
  .search-group {
    flex-direction: column;
    align-items: stretch;
  }

  .category-select,
  .search-input {
    width: 100%;
  }

  .cocktails-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
