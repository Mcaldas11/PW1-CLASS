<template>
  <div>
    <h2>Lista de Produtos</h2>

    <div class="grid">
      <ProductCard
        v-for="(p, index) in products"
        :key="index"
        :name="p.name"
        :price="p.price"
        :image="p.image"
        :in-stock="p.inStock"
        @add-to-cart="onAddToCart"
      />
    </div>

    <button @click="toggleStock">Alterar stock aleatório</button>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products: [
        {
          name: "Headset Gamer",
          price: 299.9,
          image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.worten.pt%2Fprodutos%2Fauscultadores-gaming-wireless-hyperx-cloud-alpha-over-ear-multiplataforma-preto-7566669&psig=AOvVaw2fiJA5pj_MT33BHIrz9bSj&ust=1761347324032000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjgxJ-4u5ADFQAAAAAdAAAAABAE",
          inStock: true
        },
        {
          name: "Teclado Mecânico",
          price: 79.5,
          image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.accetel.es%2Fpt%2Finformatica%2F9020-pct590bt-teclado-mecanico-sem-fio-branco-portugues-8436574061031.html&psig=AOvVaw2dr-kZSdaeE8LmGGfCI4Yq&ust=1761347284888000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNj-x4u4u5ADFQAAAAAdAAAAABAE",
          inStock: true
        },
        {
          name: "Pc Gaming",
          price: 1999,
          image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.memorypc.eu%2Fgaming-pc%2Famd-ryzen-7-560291%2F&psig=AOvVaw1I7dFegLPaLJRLzQG0UNwI&ust=1761346913424000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCGgdu2u5ADFQAAAAAdAAAAABAE",
          inStock: true
        }
      ]
    };
  },
  methods: {
    onAddToCart(productName) {
      alert(`Produto ${productName} adicionado ao carrinho!`);
    },
    toggleStock() {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      this.products[randomIndex].inStock = !this.products[randomIndex].inStock;
    }
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
</style>
