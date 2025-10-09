<template>
    <h2>Peso: {{weight}} kgs</h2>
</template>

<script>
export default {
  name: "Ex03Component",
  data() {
    return {
      weight: 72
    }
  },
  created(){
    console.log(`created ${this.weight}`)
  },
}
</script>

<style scoped></style>
