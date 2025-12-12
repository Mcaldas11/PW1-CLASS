<script setup>
import { useFavoritesStore } from './stores/favorites.js'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()
const favCount = computed(() => favoritesStore.favoritesCount)
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <RouterLink to="/" class="nav-brand">🍸 Cocktail Explorer</RouterLink>
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/discover" class="nav-link">Discover</RouterLink>
          <span class="favorites-badge" v-if="favCount > 0">❤️ {{ favCount }}</span>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}

.nav-brand:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-link:hover {
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.favorites-badge {
  background: rgba(255, 107, 107, 0.9);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.main-content {
  flex: 1;
  padding: 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-wrap: wrap;
    gap: 15px;
  }

  .nav-links {
    gap: 15px;
    width: 100%;
    order: 3;
  }

  .nav-brand {
    font-size: 1.2rem;
  }

  .nav-link {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
}
</style>
