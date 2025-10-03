<script>
export default {
  data(){
    return {
      message: 'Hello World!',
      greeting: 'my first vue app!',
      movieName: '',
      movieList: [],
    }
  },
  methods:{
    addMovie(){
      this.movieList.push(this.movieName);
      this.movieName = '';
      console.log(JSON.stringify(this.movieList));
    }
  }
}
</script>

<template>
  <header>
  <h1>{{ message }}</h1>
  <p>
    {{ greeting }}
  </p>


  <div class ="movie-forms">
  <input type="text" placeholder="Nome do filme" v-model="movieName">

  <button @click="addMovie">Adicionar</button>
  </div>
  <h2 id="movie-list">Movie List</h2>

  <ul aria-labelledby="movie-list">
    <li v-for="movie in movieList" :key="movie">{{ movie }}</li>
  </ul>
  </header>
</template>

<style scoped>
h1 {
  color:red;
}

div.movie-forms {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
