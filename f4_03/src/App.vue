<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="nav">
      <nav>
        <router-link to="/" class="logo">Sneaker Store</router-link>
        <ul class="links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root{
  --bg: #000000;
  --text: #16a34a;
  --card-bg: #07120b;
  --accent: #16a34a;
  --shadow: rgba(22,163,74,0.12);
}

html,body,#app{
  height:100%;
  background:var(--bg);
  color:var(--text);
}

#app{min-height:100vh}
.nav{background:transparent;border-bottom:1px solid rgba(255,255,255,0.03)}
nav{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px}
.links{list-style:none;display:flex;gap:12px;margin:0;padding:0}
.links a{text-decoration:none;color:var(--text)}
section{padding:20px}

</style>
