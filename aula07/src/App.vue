<script>
import { useCounterStore } from '@/stores/counter.js'
export default {
  name: 'App',
  data() {
    return {
      store: useCounterStore(),
    }
  },
}
</script>

<template>
  <h1>Counter : {{ store.count }}</h1>
  <button @click="store.increment()">Increment</button>

  <h2>Double Counter : {{ store.doubleCount }}</h2>

</template>

<style scoped></style>
