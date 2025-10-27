<template>
  <section>
    <div v-if="article">
      <h1>{{ article.title }}</h1>
      <p><em>por {{ article.author }}</em></p>
      <p>{{ article.content }}</p>
    </div>
    <div v-else>
      <p>Artigo não encontrado.</p>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { articles } from '../data/articles'

const route = useRoute()
const id = route.params.id
const article = articles.find(a => a.id === id)
</script>

<style scoped>
section{padding:20px;color:var(--text)}
h1{margin:0 0 8px;color:var(--text)}
p{color:var(--text)}
</style>
