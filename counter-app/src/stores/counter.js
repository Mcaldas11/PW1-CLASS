import { defineStore } from 'pinia'

// Store com limites e histórico conforme enunciado
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,        // valor atual
    min: -10,        // limite inferior
    max: 100,        // limite superior
    history: [],     // histórico de operações: { action, prev, next, at }
  }),
  getters: {
    // Verifica se está no máximo
    isAtMax: (state) => state.count >= state.max,
    // Verifica se está no mínimo
    isAtMin: (state) => state.count <= state.min,
    // Percentagem de progresso entre min e max (0-100%)
    progressPercent: (state) => {
      const span = state.max - state.min
      if (span === 0) return 100
      const raw = ((state.count - state.min) / span) * 100
      return Math.min(100, Math.max(0, Math.round(raw)))
    },
    // Número de operações realizadas (tamanho do histórico)
    operationsCount: (state) => state.history.length,
  },
  actions: {
    pushHistory(operation) {
      this.history.unshift({ operation, value: this.count, timestamp: Date.now() })
      if (this.history.length > 200) this.history.pop()
    },
    // incrementa 1 sem ultrapassar o max
    increment() {
      this.count = Math.min(this.max, this.count + 1)
      this.pushHistory('increment')
    },
    // decrementa 1 sem ir abaixo do min
    decrement() {
      this.count = Math.max(this.min, this.count - 1)
      this.pushHistory('decrement')
    },
    // incrementa por um valor específico respeitando limites
    incrementBy(amount) {
      const v = Number(amount)
      if (Number.isNaN(v)) return
      const next = this.count + v
      this.count = Math.max(this.min, Math.min(this.max, next))
      this.pushHistory('incrementBy')
    },
    reset() {
      this.count = 0
      this.pushHistory('reset')
    },
    setTo(value) {
      const num = Number(value)
      if (Number.isNaN(num)) return
      this.count = Math.max(this.min, Math.min(this.max, num))
      this.pushHistory('setTo')
    },
    setLimits(newMin, newMax) {
      const minVal = Number(newMin)
      const maxVal = Number(newMax)
      if (Number.isNaN(minVal) || Number.isNaN(maxVal) || minVal >= maxVal) return
      this.min = minVal
      this.max = maxVal
      // Reclampa o count se necessário
      const prev = this.count
      const next = Math.max(this.min, Math.min(this.max, prev))
      this.count = next
      this.pushHistory('setLimits', prev, next)
    },
    clearHistory() {
      this.history = []
    }
  },
})
