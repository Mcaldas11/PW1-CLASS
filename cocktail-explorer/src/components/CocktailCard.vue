<template>
  <div class="cocktail-card" @click="handleClick">
    <div class="cocktail-card-image">
      <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" class="image" />
      <button
        v-if="showFavorite"
        @click.stop="handleFavoriteClick"
        class="favorite-btn"
        :class="{ 'is-favorite': isFav }"
        :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
      >
        ♥
      </button>
    </div>
    <div class="cocktail-card-info">
      <h3 class="cocktail-name">{{ cocktail.strDrink }}</h3>
      <p v-if="cocktail.strCategory" class="cocktail-category">{{ cocktail.strCategory }}</p>
    </div>
  </div>
</template>

<script>
import { useFavoritesStore } from '../stores/favorites.js'
import { computed } from 'vue'

export default {
  name: 'CocktailCard',

  props: {
    cocktail: {
      type: Object,
      required: true,
    },
    showFavorite: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['click', 'favorite-toggle'],

  setup(props, { emit }) {
    const favoritesStore = useFavoritesStore()

    const isFav = computed(() => favoritesStore.isFavorite(props.cocktail.idDrink))

    const handleClick = () => {
      emit('click', props.cocktail)
    }

    const handleFavoriteClick = () => {
      favoritesStore.toggleFavorite(props.cocktail.idDrink)
      emit('favorite-toggle', props.cocktail.idDrink, isFav.value)
    }

    return {
      isFav,
      handleClick,
      handleFavoriteClick,
    }
  },
}
</script>

<style scoped>
.cocktail-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cocktail-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cocktail-card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--image-bg, #f5f5f5);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  background: #fff;
  color: #ff6b6b;
  transform: scale(1.1);
}

.favorite-btn.is-favorite {
  color: #ff6b6b;
}

.cocktail-card-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cocktail-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #333);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cocktail-category {
  margin: 0;
  font-size: 12px;
  color: var(--text-secondary, #999);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
