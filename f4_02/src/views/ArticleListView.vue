<template>
  <section>
    <h1>Artigos</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <h3>
          <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
        </h3>
        <p><strong>Autor:</strong> {{ article.author }}</p>
        <p>{{ article.excerpt }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { articles } from '../data/articles'
</script>

<style scoped>
section{padding:20px}
ul{list-style:none;padding:0}
li{margin-bottom:18px;padding:12px;background:var(--card-bg);border-radius:6px;color:var(--text);box-shadow:0 8px 24px var(--shadow)}
a{color:var(--accent)}
</style>
