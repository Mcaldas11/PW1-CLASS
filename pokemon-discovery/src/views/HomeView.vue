<template>
  <header>
    <h1>Pokémon Discovery</h1>
    <Transition name="fade" v-if="!pokemonStore.hasError">
      <p v-if="pokemonStore.discoveredCount > 0 && !pokemonStore.hasCompletedPokedex">
        Já descobriste {{ pokemonStore.discoveredCount }} Pokémon!
      </p>
    </Transition>
  </header>

  <main>
    <!-- Skeleton enquanto carrega OU enquanto não há Pokémon -->
    <PokemonCardSkeleton v-if="isLoading" />

    <div v-else-if="pokemonStore.hasError" class="error-message">
      <p>{{ pokemonStore.error }}</p>
    </div>

    <div v-else-if="pokemonStore.hasCompletedPokedex" class="congrats-message">
      <p>Parabéns! Descobriste todos os {{ pokemonStore.totalCount }} Pokémon!</p>
    </div>

    <PokemonCard v-else :pokemon="pokemonStore.currentPokemon" @click="goToDetail" />

    <button class="btn-discover" :disabled="isLoading" @click="handleButtonClick">
      {{ buttonText }}
    </button>
  </main>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { mapStores } from 'pinia'

export default {
  name: 'HomeView',
  components: {
    PokemonCard,
    PokemonCardSkeleton,
  },
  computed: {
    ...mapStores(usePokemonStore),

    isLoading() {
      return (
        this.pokemonStore.isLoading || (!this.pokemonStore.hasPokemon && !this.pokemonStore.hasError)
      )
    },

    buttonText() {
      if (this.isLoading) return 'A carregar...'
      if (this.pokemonStore.hasError) return 'Tentar Novamente'
      if (this.pokemonStore.hasCompletedPokedex) return 'Recomeçar Aventura'
      return 'Descobrir Novo Pokémon'
    },
  },
  methods: {
    // Handler do botão principal: descobre novo ou reinicia
    handleButtonClick() {
      if (this.pokemonStore.hasCompletedPokedex) {
        this.pokemonStore.resetPokedex()
      } else {
        this.pokemonStore.fetchRandomPokemon()
      }
    },

    // Navega para página de detalhe do Pokémon atual
    goToDetail() {
      if (!this.pokemonStore.currentPokemon) return
      this.$router.push({
        name: 'pokemon-detail',
        params: { id: this.pokemonStore.currentPokemon.id },
      })
    },
  },

  // created: inicializa IDs e carrega primeiro Pokémon se necessário
  created() {
    this.pokemonStore.initializeAvailableIds()

    if (!this.pokemonStore.currentPokemon && this.pokemonStore.availableIds.length > 0) {
      this.pokemonStore.fetchRandomPokemon()
    }
  },
}
</script>

