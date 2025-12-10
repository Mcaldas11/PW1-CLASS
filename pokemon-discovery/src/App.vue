<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="topbar">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 16px; }
.topbar { margin-bottom: 16px; }
nav a { margin-right: 12px; font-weight: 700; }
</style>
