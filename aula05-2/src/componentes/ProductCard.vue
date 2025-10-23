<template>
  <div class="product-card">
    <img :src="image" :alt="name" class="product-image" />

    <h3>{{ name }}</h3>
    <p>{{ formattedPrice }} {{ unit }}</p>

    <p v-if="inStock" class="stock in">Em Stock</p>
    <p v-else class="stock out">Esgotado</p>

    <button v-if="inStock" @click="addToCart">Adicionar ao Carrinho</button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      validator: (value) => value >= 0
    },
    unit: {
      type: String,
      default: "€"
    },
    image: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formattedPrice() {
      return this.price.toFixed(2);
    }
  },
  methods: {
    addToCart() {
      // Emite evento para o componente pai
      this.$emit("add-to-cart", this.name);
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  width: 240px;
  text-align: center;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
}
.stock.in {
  color: green;
}
.stock.out {
  color: red;
}
button {
  padding: 6px 10px;
  margin-top: 8px;
  border: none;
  background-color: #2b6cb0;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
