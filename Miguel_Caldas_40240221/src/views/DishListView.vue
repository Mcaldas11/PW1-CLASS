<script>
import { computed, onMounted, defineComponent } from 'vue'
import { useDishesStore } from '@/stores/dishes'

export default defineComponent({
  setup() {
    const categories = [
      { key: null, label: 'Todos' },
      { key: 'starters', label: 'Entradas' },
      { key: 'mains', label: 'Pratos Principais' },
      { key: 'desserts', label: 'Sobremesas' },
      { key: 'drinks', label: 'Bebidas' },
      { key: 'available', label: 'Disponíveis' },
    ]

    const dishesStore = useDishesStore()

    const dishes = computed(() => dishesStore.filteredDishes)
    const activeCategory = computed(() => dishesStore.activeCategory)
    const isLoading = computed(() => dishesStore.isLoading)
    const isUpdating = computed(() => dishesStore.isUpdating)
    const errorMessage = computed(() => dishesStore.error)

    onMounted(async () => {
      if (!dishesStore.dishes.length) {
        await dishesStore.loadAllDishes()
      }
    })

    function handleCategorySelect(categoryKey) {
      if (categoryKey === null) {
        dishesStore.loadAllDishes()
      } else {
        dishesStore.loadDishesByCategory(categoryKey)
      }
    }

    function handleToggleAvailability(id) {
      dishesStore.toggleDishAvailability(id)
    }

    function handleRemoveDish(id) {
      dishesStore.removeDish(id)
    }

    function shortDescription(text, length = 120) {
      if (!text) {
        return ''
      }
      return text.length <= length ? text : `${text.slice(0, length)}...`
    }

    function availabilityLabel(isAvailable) {
      return isAvailable ? 'Disponível' : 'Indisponível'
    }

    return {
      categories,
      dishes,
      activeCategory,
      isLoading,
      isUpdating,
      errorMessage,
      handleCategorySelect,
      handleToggleAvailability,
      handleRemoveDish,
      shortDescription,
      availabilityLabel,
    }
  },
})
</script>

<template>
  <section>
    <header>
      <div>
        <h2>Pratos do Menu</h2>
      </div>
      <button @click="$router.push('/dishes/create')">Criar Prato</button>
    </header>

    <nav>
      <p>Filtrar por categoria:</p>
      <div>
        <button
          v-for="category in categories"
          :key="category.key ?? 'all'"
          type="button"
          @click="handleCategorySelect(category.key)"
        >
          {{ category.label }}
          <span v-if="category.key === activeCategory || (!category.key && !activeCategory)">
          </span>
        </button>
      </div>
    </nav>

    <section>
      <p v-if="isLoading">A carregar pratos...</p>
      <p v-else-if="errorMessage">{{ errorMessage }}</p>
      <p v-else-if="!dishes.length">Nenhum prato encontrado.</p>

      <ul v-else>
        <li v-for="dish in dishes" :key="dish.id">
          <header>
            <h3>
              {{ dish.name }}
              <span v-if="!dish.available">[Indisponível]</span>
            </h3>
            <p>{{ availabilityLabel(dish.available) }}</p>
          </header>
          <figure>
            <img :src="dish.imageUrl" :alt="dish.name" width="160" height="120" />
          </figure>
          <p>{{ shortDescription(dish.description) }}</p>
          <p>Preço: {{ dish.price }} €</p>
          <footer>
            <button type="button" @click="handleToggleAvailability(dish.id)" :disabled="isUpdating">
              Alternar disponibilidade
            </button>
            <button type="button" @click="handleRemoveDish(dish.id)" :disabled="isUpdating">
              Remover prato
            </button>
          </footer>
        </li>
      </ul>
    </section>
  </section>
</template>
