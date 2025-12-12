<template>
  <div class="random-view">
    <header class="header">
      <h1>🎲 Discover Random Cocktails</h1>
      <p class="subtitle">Find your next favorite cocktail</p>
    </header>

    <!-- Loading state -->
    <div v-if="cocktailsStore.loading" class="loading">
      <div class="spinner"></div>
      <p>Loading a random cocktail...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="cocktailsStore.error" class="error">
      <p>{{ cocktailsStore.error }}</p>
      <button @click="handleRetry" class="retry-btn">Try Again</button>
    </div>

    <!-- Cocktail card -->
    <div v-else-if="cocktailsStore.currentCocktail" class="cocktail-container">
      <div class="cocktail-card-large">
        <div class="card-image">
          <img
            :src="cocktailsStore.currentCocktail.strDrinkThumb"
            :alt="cocktailsStore.currentCocktail.strDrink"
            class="image"
          />
          <button
            @click="toggleFavorite"
            class="favorite-btn-large"
            :class="{ 'is-favorite': isFavorite }"
            :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            ♥
          </button>
        </div>
        <div class="card-info">
          <h2 class="cocktail-name">{{ cocktailsStore.currentCocktail.strDrink }}</h2>
          <p v-if="cocktailsStore.currentCocktail.strCategory" class="cocktail-category">
            {{ cocktailsStore.currentCocktail.strCategory }}
          </p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="actions">
        <button @click="goToDetail" class="btn btn-primary">View Details</button>
        <button @click="discoverAnother" class="btn btn-discover">Discover Another</button>
        <button @click="goHome" class="btn btn-secondary">Back to Home</button>
      </div>
    </div>

    <!-- Initial state - no cocktail loaded yet -->
    <div v-else class="initial-state">
      <p>Click the button below to discover your first random cocktail!</p>
      <button @click="discoverAnother" class="btn btn-discover btn-large">Discover Now</button>
    </div>
  </div>
</template>

<script>
import { useCocktailsStore } from '../stores/cocktails.js'
import { useFavoritesStore } from '../stores/favorites.js'
import {  computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RandomCocktailView',

  setup() {
    const cocktailsStore = useCocktailsStore()
    const favoritesStore = useFavoritesStore()
    const router = useRouter()

    onMounted(async () => {
      // Carrega um cocktail aleatório ao montar
      await cocktailsStore.loadRandomCocktail()
    })

    const discoverAnother = async () => {
      await cocktailsStore.loadRandomCocktail()
    }

    const goToDetail = () => {
      if (cocktailsStore.currentCocktail) {
        router.push({
          name: 'detail',
          params: { id: cocktailsStore.currentCocktail.idDrink },
        })
      }
    }

    const goHome = () => {
      router.push({ name: 'home' })
    }

    const handleRetry = async () => {
      await cocktailsStore.loadRandomCocktail()
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

    return {
      cocktailsStore,
      isFavorite,
      discoverAnother,
      goToDetail,
      goHome,
      handleRetry,
      toggleFavorite,
    }
  },
}
</script>

<style scoped>
.random-view {
  max-width: 1000px;
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

.loading,
.error,
.initial-state {
  text-align: center;
  padding: 60px 20px;
}

.loading p,
.error p,
.initial-state p {
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

.retry-btn {
  padding: 12px 30px;
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

.cocktail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.cocktail-card-large {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.card-image {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  background: #f5f5f5;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn-large {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn-large:hover {
  background: #fff;
  color: #ff6b6b;
  transform: scale(1.15);
}

.favorite-btn-large.is-favorite {
  color: #ff6b6b;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cocktail-name {
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  color: #333;
  line-height: 1.3;
}

.cocktail-category {
  font-size: 0.95rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 12px 30px;
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
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.btn-discover {
  background: #4ecdc4;
  color: white;
}

.btn-discover:hover {
  background: #45b5ae;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-large {
  padding: 15px 50px;
  font-size: 1.1rem;
}

.initial-state {
  background: white;
  padding: 80px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .cocktail-card-large {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }

  .card-image {
    height: 250px;
  }

  .cocktail-name {
    font-size: 1.5rem;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
