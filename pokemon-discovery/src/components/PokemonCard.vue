<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="card" tabindex="0">
    <div class="header">
      <img :src="pokemon.sprites?.front_default" :alt="pokemon.name" />
      <div>
        <h2>{{ pokemon.name }}</h2>
        <p class="id">#{{ pokemon.id }}</p>
      </div>
    </div>
    <div class="types">
      <span v-for="t in pokemon.types" :key="t.type.name" class="type">{{ t.type.name }}</span>
    </div>
  </article>
</template>

