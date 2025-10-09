<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <div>
    {{ count }}
  </div>
  <p>dobro: {{ double() }}</p>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
    }
  },
  methods: {
    double() {
      return this.count * 2
    },
  },
  beforeCreate() {
    console.log(`beforeCreate ${this.count}`)
  },
  created() {
    console.log(`created ${this.count}`)
  },
}
</script>

<style scoped></style>
