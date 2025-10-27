<template>
  <div>
    <h2>All Products</h2>
    <div class="grid">
      <article v-for="p in products" :key="p.id" class="card">
        <img :src="p.image" :alt="p.name" />
        <h4>{{ p.name }}</h4>
        <p>{{ p.category }} — €{{ p.price }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { products } from '../data/products'
</script>

<style scoped>
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.card{background:var(--card-bg);padding:10px;border-radius:6px;text-align:center;color:var(--text);box-shadow:0 8px 24px var(--shadow)}
.card img{width:100%;height:auto;border-radius:4px}
</style>
