<template>
  <div>
    <h2>Category: {{ categoryName }}</h2>
    <div class="grid">
      <article v-for="p in filtered" :key="p.id" class="card">
        <img :src="p.image" :alt="p.name" />
        <h4>{{ p.name }}</h4>
        <p>{{ p.category }} — €{{ p.price }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'

const route = useRoute()

// reactive computed value — updates when route.params.name changes
const categoryName = computed(() => route.params.name || 'All')

const filtered = computed(() => {
  const name = categoryName.value
  if (!name || name === 'All') return products
  return products.filter(p => p.category === name)
})
</script>

<style scoped>
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.card{background:var(--card-bg);padding:10px;border-radius:6px;text-align:center;color:var(--text);box-shadow:0 8px 24px var(--shadow)}
.card img{width:100%;height:auto;border-radius:4px}
</style>
