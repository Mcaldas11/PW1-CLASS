<template>
  <div class="detail-view">
    <!-- Loading state -->
    <div v-if="cocktailsStore.loading" class="loading">
      <div class="spinner"></div>
      <p>Loading cocktail details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="cocktailsStore.error || !cocktailsStore.currentCocktail" class="error">
      <h2>Oops!</h2>
      <p>{{ cocktailsStore.error || 'Cocktail not found' }}</p>
      <button @click="goBack" class="btn btn-primary">← Go Back</button>
    </div>

    <!-- Cocktail details -->
    <div v-else class="detail-container">
      <button @click="goBack" class="back-btn">← Back</button>

      <div class="detail-content">
        <!-- Image section -->
        <div class="image-section">
          <div class="image-container">
            <img
              :src="cocktailsStore.currentCocktail.strDrinkThumb"
              :alt="cocktailsStore.currentCocktail.strDrink"
              class="cocktail-image"
            />
            <button
              @click="toggleFavorite"
              class="favorite-btn"
              :class="{ 'is-favorite': isFavorite }"
              :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            >
              ♥
            </button>
          </div>
        </div>

        <!-- Info section -->
        <div class="info-section">
          <!-- Header -->
          <div class="header-info">
            <h1 class="cocktail-name">{{ cocktailsStore.currentCocktail.strDrink }}</h1>
            <div class="tags">
              <span v-if="cocktailsStore.currentCocktail.strCategory" class="tag">
                {{ cocktailsStore.currentCocktail.strCategory }}
              </span>
              <span
                v-if="cocktailsStore.currentCocktail.strGlass"
                class="tag"
              >
                🥃 {{ cocktailsStore.currentCocktail.strGlass }}
              </span>
              <span class="tag" :class="{ 'tag-alcohol': isAlcoholic }">
                {{ isAlcoholic ? '🍷 Alcoholic' : '🍹 Non-Alcoholic' }}
              </span>
            </div>
          </div>

          <!-- Instructions -->
          <div v-if="cocktailsStore.currentCocktail.strInstructions" class="section">
            <h2>Instructions</h2>
            <p class="instructions">{{ cocktailsStore.currentCocktail.strInstructions }}</p>
          </div>

          <!-- Ingredients -->
          <div class="section">
            <h2>Ingredients</h2>
            <ul v-if="cocktailsStore.ingredients.length > 0" class="ingredients-list">
              <li v-for="(item, index) in cocktailsStore.ingredients" :key="index" class="ingredient-item">
                <span class="ingredient-name">{{ item.ingredient }}</span>
                <span v-if="item.measure" class="ingredient-measure">{{ item.measure }}</span>
              </li>
            </ul>
            <p v-else class="no-ingredients">No ingredients available</p>
          </div>

          <!-- Actions -->
          <div class="actions">
            <button @click="goBack" class="btn btn-secondary">Back</button>
            <a
              :href="`https://www.thecocktaildb.com/drink/${cocktailsStore.currentCocktail.idDrink}`"
              target="_blank"
              rel="noopener"
              class="btn btn-external"
            >
              View on CocktailDB →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCocktailsStore } from '../stores/cocktails.js'
import { useFavoritesStore } from '../stores/favorites.js'
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'CocktailDetailView',

  setup() {
    const cocktailsStore = useCocktailsStore()
    const favoritesStore = useFavoritesStore()
    const router = useRouter()
    const route = useRoute()

    onMounted(async () => {
      const id = route.params.id
      if (id) {
        await cocktailsStore.loadCocktailById(id)
      }
    })

    const goBack = () => {
      router.back()
    }

    const isFavorite = computed(() =>
      cocktailsStore.currentCocktail
        ? favoritesStore.isFavorite(cocktailsStore.currentCocktail.idDrink)
        : false,
    )

    const toggleFavorite = () => {
      if (cocktailsStore.currentCocktail) {
        favoritesStore.toggleFavorite(cocktailsStore.currentCocktail.idDrink)
      }
    }

    const isAlcoholic = computed(() => {
      if (!cocktailsStore.currentCocktail) return false
      return (
        cocktailsStore.currentCocktail.strAlcoholic === 'Alcoholic' ||
        cocktailsStore.currentCocktail.strAlcoholic === 'Yes'
      )
    })

    return {
      cocktailsStore,
      goBack,
      isFavorite,
      toggleFavorite,
      isAlcoholic,
    }
  },
}
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.loading,
.error {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  max-width: 800px;
  margin: 40px auto;
}

.loading p,
.error p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
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

.error h2 {
  margin-top: 0;
  color: #d32f2f;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #ff6b6b;
  color: white;
}

.btn-primary:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

.back-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: white;
  transform: translateX(-4px);
}

.detail-container {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.image-section {
  display: flex;
  align-items: flex-start;
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}

.cocktail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: #ccc;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.favorite-btn:hover {
  background: white;
  color: #ff6b6b;
  transform: scale(1.15);
}

.favorite-btn.is-favorite {
  color: #ff6b6b;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.header-info {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 20px;
}

.cocktail-name {
  margin: 0 0 15px 0;
  font-size: 2.2rem;
  color: #333;
  line-height: 1.2;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: inline-block;
  padding: 8px 14px;
  background: #f0f0f0;
  color: #666;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.tag-alcohol {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section h2 {
  margin: 0;
  font-size: 1.3rem;
  color: #333;
}

.instructions {
  margin: 0;
  line-height: 1.6;
  color: #666;
  font-size: 1rem;
}

.ingredients-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-left: 4px solid #ff6b6b;
  border-radius: 4px;
}

.ingredient-name {
  font-weight: 600;
  color: #333;
}

.ingredient-measure {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.no-ingredients {
  margin: 0;
  color: #999;
  font-style: italic;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-external {
  background: #4ecdc4;
  color: white;
  text-decoration: none;
  display: inline-block;
}

.btn-external:hover {
  background: #45b5ae;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  .cocktail-name {
    font-size: 1.6rem;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .detail-view {
    padding: 10px;
  }
}
</style>
