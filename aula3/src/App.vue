<script>
import CounterWidget from './components/Counter.vue'

export default {
  components: { CounterWidget },
  data() {
    return {
      form: {
        name: '',
        age: null,
        gender: 'Masculino',
        hobbies: ['', '']
      },
      hobbyError: '',
      submitted: false
    }
  },
  methods: {
    onSubmit() {
      // Basic validation for age range
      if (this.form.age < 15 || this.form.age > 100) {
        alert('Idade deve estar entre 15 e 100.')
        return
      }

      // Hobbies validation: at least two non-empty hobby strings
      const nonEmpty = this.form.hobbies.filter(h => h && h.trim())
      if (nonEmpty.length < 2) {
        this.hobbyError = 'Escreva pelo menos dois hobbies.'
        return
      }

      // update form.hobbies to be the non-empty list (trimmed)
      this.form.hobbies = nonEmpty.map(h => h.trim())
      this.hobbyError = ''
      this.submitted = true
    },
    onReset() {
      this.form = { name: '', age: null, gender: 'Masculino', hobbies: ['', ''] }
      this.hobbyError = ''
      this.submitted = false
    },
    addHobbyInput() {
      this.form.hobbies.push('')
    },
    removeHobby(idx) {
      if (this.form.hobbies.length <= 2) return
      this.form.hobbies.splice(idx, 1)
    }
  }
}
</script>

<template>
  <div>
    <CounterWidget />
    <form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <div>
      <label for="name">Nome:</label>
      <input id="name" v-model="form.name" type="text" required />
    </div>

    <div>
      <label for="age">Idade (15-100):</label>
      <input id="age" v-model.number="form.age" type="number" min="15" max="100" required />
    </div>

    <div>
      <label>Género:</label>
      <label><input type="radio" value="Masculino" v-model="form.gender" /> Masculino</label>
      <label><input type="radio" value="Feminino" v-model="form.gender" /> Feminino</label>
    </div>

    <div>
      <label>Hobbies (escreva pelo menos dois):</label>
      <div v-for="(hobby, idx) in form.hobbies" :key="idx" style="display:flex; gap:8px; align-items:center; margin:4px 0">
        <input type="text" v-model="form.hobbies[idx]" :placeholder="`Hobby ${idx+1}`" />
        <button type="button" @click="removeHobby(idx)">Remover</button>
      </div>
      <button type="button" @click="addHobbyInput">Acrescentar</button>
      <p style="color: red" v-if="hobbyError">{{ hobbyError }}</p>
    </div>

    <div>
      <button type="submit">Submeter</button>
      <button type="reset">Reset</button>
    </div>

    <div v-if="submitted">
      <h3>Dados submetidos</h3>
      <p>Nome: {{ form.name }}</p>
      <p>Idade: {{ form.age }}</p>
      <p>Género: {{ form.gender }}</p>
      <p>Hobbys: <span v-if="form.hobbies.length">{{ form.hobbies.join(', ') }}</span><span v-else> Nenhum</span></p>
    </div>
    </form>
  </div>
</template>



<style scoped>
form > div { margin: 8px 0 }
</style>
