<template>
  <div class="shop">
    <aside class="sidebar">
      <h3>Categories</h3>
      <ul>
        <li><router-link to="/shop">All</router-link></li>
        <li><router-link :to="`/shop/category/Running`">Running</router-link></li>
        <li><router-link :to="`/shop/category/Casual`">Casual</router-link></li>
        <li><router-link :to="`/shop/category/Basketball`">Basketball</router-link></li>
      </ul>
    </aside>

    <section class="shop-content">
      <router-view />
    </section>
  </div>
</template>

<style scoped>
.shop{display:flex;gap:20px;padding:20px}
.sidebar{width:200px}
.sidebar ul{list-style:none;padding:0}
.sidebar a{text-decoration:none;color:var(--text)}
.sidebar a.router-link-active{color:var(--accent);font-weight:600}
.shop-content{flex:1}
</style>
