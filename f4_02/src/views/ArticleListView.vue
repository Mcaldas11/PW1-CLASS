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
li{margin-bottom:18px;padding:12px;background:#f6f6f6;border-radius:6px}
a{color:#0969da}
</style>
