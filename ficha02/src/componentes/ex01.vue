<template>
  <div class="counter-container">
    <div class="counter-card">
      <h2>🧮 Counter Widget</h2>

      <h3>Count: {{ count }}</h3>

      <div class="buttons">
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
        <button @click="reset">Reset</button>
        <button @click="addFive">+5</button>
        <button @click="addTen">+10</button>
        <button @click="addFifty">+50</button>
      </div>

      <p class="shortcuts">
        Shortcuts: [+] = +1, [-] = -1, [R] = Reset
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CounterWidget',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      if (this.count <= 0) {
        alert('O contador não pode ser negativo!')
        return
      }
      this.count--
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
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey)
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKey)
  }
}
</script>

<style scoped>
.counter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: linear-gradient(135deg, #f9fafb, #eef1f5);
  font-family: 'Poppins', sans-serif;
}

.counter-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.counter-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.counter-card h2 {
  margin-bottom: 1rem;
  color: #007bff;
  font-size: 1.8rem;
}

.counter-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
  background-color: #004080;
}

.shortcuts {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
