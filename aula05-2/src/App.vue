<template>
  <div>
    <h1>Exercício 2 – Componentes Vue.js</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from "./componentes/ProductList.vue";

export default {
  name: "App",
  components: { ProductList }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #fafafa;
  color: #333;
}
h1 {
  text-align: center;
  margin: 20px 0;
}
</style>
