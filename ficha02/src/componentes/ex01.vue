<template>
  <div class="counter">
    <h1>EX01</h1>
    <h2>Counter: {{ count }}</h2>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <button @click="reset">Reset</button>
    <button @click="addFive">+5</button>
    <button @click="addTen">+10</button>
    <button @click="addFifty">+50</button>
    <p class="shortcuts">Atalhos: [+] = +1, [-] = -1, [R] = reset</p>
  </div>
 
</template>

<script>
export default {
  name: 'CounterWidget',
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count += 1
    },
    decrement() {
      if (this.count <= 0) {
        alert('O contador não pode ser negativo')
        return
      }
      this.count -= 1
    },
    addFive() {
      this.count += 5
    },
    addTen() {
      this.count += 10
    },
    addFifty() {
      this.count += 50
    },
   
    reset() {
      this.count = 0
    },
    handleKey(e) {
      const key = e.key.toLowerCase()
      if (key === '+') this.increment()
      else if (key === '-') this.decrement()
      else if (key === 'r') this.reset()
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey)
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKey)
  },
}
</script>

<style scoped>
.counter {
  margin-bottom: 12px;
}
.counter button {
  margin-right: 8px;
}
</style>
