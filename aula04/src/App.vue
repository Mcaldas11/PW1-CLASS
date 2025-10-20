<script >
import ButtonCounter from './componentes/ButtonCounter.vue';
export default {
  name: 'App',
  components: {
    ButtonCounter,
  },
  data() {
    return { count: 0 }
  },
  methods: {
    onCountChanged(newCount) { this.count = newCount }
  }
};
</script>

<template>
  <h1>You did it!</h1>
  <ButtonCounter @count-changed="onCountChanged" />
  <p>Count: {{ count }}</p>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
