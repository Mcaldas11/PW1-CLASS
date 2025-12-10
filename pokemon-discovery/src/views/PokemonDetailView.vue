<template>
	<main>
		<p v-if="isLoading">A carregar...</p>
		<p v-else-if="pokemonStore.hasError">{{ pokemonStore.error }}</p>

		<section v-else-if="pokemonStore.hasPokemon">
			<header>
				<h1>#{{ pokemonStore.pokedexNumber }} - {{ pokemonStore.displayName }}</h1>
				<div>
					<img :src="pokemonStore.currentPokemon.sprites?.front_default" :alt="pokemonStore.displayName" />
					<img :src="pokemonStore.currentPokemon.sprites?.back_default" :alt="pokemonStore.displayName" />
				</div>
			</header>

			<section>
				<h3>Tipos</h3>
				<ul>
					<li v-for="t in pokemonStore.types" :key="t">{{ t }}</li>
				</ul>
			</section>

			<section>
				<h3>Altura & Peso</h3>
				<p>{{ pokemonStore.currentPokemon.height }} dm / {{ pokemonStore.currentPokemon.weight }} hg</p>
			</section>

			<section>
				<h3>Estatísticas base</h3>
				<ul>
					<li v-for="s in pokemonStore.currentPokemon.stats" :key="s.stat.name">
						{{ s.stat.name }}: {{ s.base_stat }}
					</li>
				</ul>
			</section>

			<section>
				<h3>Abilities</h3>
				<ul>
					<li v-for="a in pokemonStore.currentPokemon.abilities" :key="a.ability.name">
						{{ a.ability.name }}
					</li>
				</ul>
			</section>

			<div>
				<button @click="goBack">Voltar</button>
				<button @click="discoverAnother">Descobrir outro</button>
			</div>
		</section>
	</main>
</template>

<script>
import { mapStores } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

export default {
	name: 'PokemonDetailView',
	computed: {
		...mapStores(usePokemonStore),
		isLoading() {
			return this.pokemonStore.isLoading
		},
	},
	methods: {
		ensurePokemon(id) {
			const numericId = Number(id)
			if (!numericId) return
			if (this.pokemonStore.currentPokemon?.id === numericId) return
			this.pokemonStore.fetchPokemonById(numericId)
		},
		goBack() {
			this.$router.back()
		},
		discoverAnother() {
			this.pokemonStore.fetchRandomPokemon()
			this.$router.push({ name: 'home' })
		},
	},
	created() {
		this.pokemonStore.initializeAvailableIds()
		this.ensurePokemon(this.$route.params.id)
	},
	watch: {
		'$route.params.id'(newId) {
			this.ensurePokemon(newId)
		},
	},
}
</script>

