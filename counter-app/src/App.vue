<script setup>
import { ref, computed } from 'vue'
import { useCounterStore } from './stores/counter'

const store = useCounterStore()
const customIncrement = ref(5)
const progressStyle = computed(() => ({ width: store.progressPercent + '%' }))

function applyCustomIncrement() {
  store.incrementBy(Number(customIncrement.value) || 0)
}
</script>

<template>
  <div class="counter-wrapper">
    <h1>Counter</h1>

    <div class="value-row">
      <div class="current" :class="{ limit: store.isAtMin || store.isAtMax }">{{ store.count }}</div>
      <div class="limits">Min: {{ store.min }} | Max: {{ store.max }}</div>
      <div class="flags">
        <span v-if="store.isAtMin" class="flag min">MIN</span>
        <span v-if="store.isAtMax" class="flag max">MAX</span>
      </div>
    </div>

    <div class="progress-bar"><div class="progress" :style="progressStyle"></div></div>
    <p class="percent">Progresso: {{ store.progressPercent }}%</p>

    <div class="buttons">
      <button @click="store.decrement()" :disabled="store.isAtMin">-1</button>
      <button @click="store.increment()" :disabled="store.isAtMax">+1</button>
      <button @click="store.incrementBy(5)" :disabled="store.count + 5 > store.max">+5</button>
      <button @click="store.reset()">Reset</button>
    </div>

    <div class="custom-inc">
      <input type="number" v-model="customIncrement" />
      <button @click="applyCustomIncrement" :disabled="customIncrement == 0">Incrementar por</button>
    </div>

    <h2>Últimas operações ({{ store.operationsCount }})</h2>
    <ul class="history" v-if="store.history.length">
      <li v-for="(h, idx) in store.history.slice(0,5)" :key="idx">
        <strong>{{ h.operation }}</strong>
        <span>valor: {{ h.value }}</span>
        <small>{{ new Date(h.timestamp).toLocaleTimeString() }}</small>
      </li>
    </ul>
    <p v-else>Nenhuma operação ainda.</p>
  </div>
</template>

<style ></style>
