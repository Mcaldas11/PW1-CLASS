<template>
	<section>
		<h1>Produtos</h1>
		<div style="margin-bottom:12px">
			<button @click="toggleRandomStock">Alterar stock aleatório</button>
		</div>

		<div class="cards">
			<ProductCard
				v-for="p in products"
				:key="p.name"
				:product="p"
				@add-to-cart="onAddToCart"
			/>
		</div>
	</section>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
	name: 'ProductList',
	components: { ProductCard },
	data() {
		return {
			products: [
				{ name: 'Teclado Mecânico', price: 59.9, image: '', inStock: true },
				{ name: 'Rato Óptico', price: 19.5, image: '', inStock: true },
				{ name: 'Monitor 24"', price: 129.99, image: '', inStock: false },
			]
		}
	},
	methods: {
		onAddToCart(productName) {
			alert(`Produto ${productName} adicionado ao carrinho!`)
		},
		toggleRandomStock() {
			if (!this.products.length) return
			const idx = Math.floor(Math.random() * this.products.length)
			this.products[idx].inStock = !this.products[idx].inStock
		}
	}
}
</script>

<style scoped>
.cards{display:flex;flex-direction:column;gap:12px}
@media(min-width:700px){.cards{flex-direction:row;flex-wrap:wrap}.cards > *{width:48%}}
button{background:#2563eb;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer}
</style>
