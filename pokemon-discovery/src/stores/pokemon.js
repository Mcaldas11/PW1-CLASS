import { defineStore } from 'pinia'
import { get } from '../api/api'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    currentPokemon: null,
    loading: false,
    error: null,
    availableIds: [],
    discoveredCount: 0,
    totalCount: 151,
    discoveredIds: [],
  }),
  getters: {
    hasPokemon: (state) => !!state.currentPokemon,
    hasError: (state) => !!state.error,
    isLoading: (state) => state.loading,
    displayName: (state) => (state.currentPokemon?.name ? state.currentPokemon.name : ''),
    pokedexNumber: (state) => state.currentPokemon?.id ?? null,
    sprite: (state) => state.currentPokemon?.sprites?.front_default ?? '',
    types: (state) => state.currentPokemon?.types?.map((t) => t.type.name) ?? [],
    hasCompletedPokedex: (state) =>
      state.availableIds.length === 0 && state.discoveredCount === state.totalCount,
  },
  actions: {
    loadFromStorage() {
      try {
        const raw = localStorage.getItem('pokemon-discovery')
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.discoveredIds)) {
          this.discoveredIds = parsed.discoveredIds
          this.discoveredCount = this.discoveredIds.length
        }
        if (typeof parsed.totalCount === 'number' && parsed.totalCount > 0) {
          this.totalCount = parsed.totalCount
        }
      } catch {
        // ignore storage errors
      }
    },
    saveToStorage() {
      try {
        localStorage.setItem(
          'pokemon-discovery',
          JSON.stringify({
            discoveredIds: this.discoveredIds,
            totalCount: this.totalCount,
          }),
        )
      } catch {
        // ignore storage errors
      }
    },
    initializeAvailableIds() {
      if (this.availableIds.length > 0) return
      this.loadFromStorage()
      const allIds = Array.from({ length: this.totalCount }, (_, i) => i + 1)
      this.availableIds = allIds.filter((id) => !this.discoveredIds.includes(id))
      this.discoveredCount = this.discoveredIds.length
    },
    resetPokedex() {
      this.currentPokemon = null
      this.error = null
      this.discoveredCount = 0
      this.discoveredIds = []
      this.availableIds = Array.from({ length: this.totalCount }, (_, i) => i + 1)
      this.saveToStorage()
    },
    async fetchRandomPokemon() {
      this.error = null
      this.loading = true
      try {
        this.initializeAvailableIds()
        if (this.availableIds.length === 0) {
          this.loading = false
          return
        }
        const idx = Math.floor(Math.random() * this.availableIds.length)
        const id = this.availableIds.splice(idx, 1)[0]
        this.currentPokemon = await get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!this.discoveredIds.includes(id)) {
          this.discoveredIds.push(id)
          this.discoveredCount = this.discoveredIds.length
        }
        this.saveToStorage()
      } catch {
        this.error = 'Não foi possível carregar um Pokémon.'
        this.currentPokemon = null
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonById(id) {
      if (!id) return
      this.error = null
      this.loading = true
      try {
        this.currentPokemon = await get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      } catch {
        this.error = 'Não foi possível carregar o Pokémon.'
        this.currentPokemon = null
      } finally {
        this.loading = false
      }
    },
  },
})
