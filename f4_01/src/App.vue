<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="nav">
      <nav>
        <router-link to="/" class="logo">My Portfolio</router-link>
        <ul class="links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/projects">Projects</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div>Miguel Caldas - Ano letivo 2025/2026</div>
    </footer>
  </div>
</template>

<style>
:root {
  --bg: #000000; 
  --accent: #16a34a; 
  --card-bg: #07120b; 
  --text: #16a34a; 
  --shadow: rgba(22, 163, 74, 0.18); 
}

html,
body,
#app {
  height: 100%;
  background: var(--bg);
  color: var(--text);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

nav {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.logo {
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}

.links {
  list-style: none;
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.links a {
  text-decoration: none;
  color: var(--text);
}

.links a.router-link-active {
  color: var(--accent);
  font-weight: 600;
}

.content {
  max-width: 900px;
  margin: 24px auto;
  padding: 0 16px 100px;
  flex: 1 0 auto;
}

.site-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #16a34a;
  color: #000000;
  z-index: 9999;
  text-align: center;
  padding: 10px 12px;
  font-size: 14px;
}

.site-footer > div {
  background: transparent;
  color: #000000 !important;
}
</style>
