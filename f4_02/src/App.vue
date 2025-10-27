<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="nav">
      <nav>
        <router-link to="/" class="logo">Tech Blog</router-link>
        <ul class="links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/articles">Articles</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app{min-height:100vh}
.nav{background:#fff;border-bottom:1px solid #eee}
nav{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px}
.links{list-style:none;display:flex;gap:12px;margin:0;padding:0}
.links a{text-decoration:none;color:#0b6}
section{padding:20px}
</style>
