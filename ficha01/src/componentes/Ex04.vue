<template>
    <div v-if="availability">
        <h2>Product Name: {{productName}}</h2>
        <h2>Product Description:</h2>
        <p v-html="productDesc"></p>
        <img :src="productImage" alt="Product Image">
        <h2 v-if="price>= 1000">Price ${{ price }}</h2>
        <button @click="reset">reset</button>
        <button @click="buy">Comprar</button>
    </div>
</template>

<script>
    export default {
        name : "Ex04Product",
        data(){
                return {
                 productName: "Dell XPS",
                 productDesc: "Processador i7<br>Disco SSD 256GB<br> Monitor Samsung 21’",
                 productImage: "https://tinyurl.com/2p9dnx68",
                 price: 1200,
                 availability: true
                }
          },
          methods: {
            reset(){
                this.productName = "Dell XPS";
                this.productDesc = "Processador i7<br>Disco SSD 256GB<br> Monitor Samsung 21’";
                this.productImage = "https://tinyurl.com/2p9dnx68";
                this.price = 1200;
            },
            buy(){
                this.availability = false;
                alert("Compra efetuada com sucesso!");
            }
          }
    }

    
</script>

<style lang="scss" scoped>

</style>