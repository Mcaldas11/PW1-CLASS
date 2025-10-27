<template>
	<section>
		<h1>Contacto</h1>
		<p>Nome: Miguel Caldas</p>
		<p>Email: miguelmeniciocaldas@gmail.com</p>
		<p>Telefone: +351 961 057 211</p>
		<p>LinkedIn: <a href="#" @click.prevent>https://www.linkedin.com/in/miguel-caldas-7275a8212/</a></p>
	</section>
</template>

<style scoped>
section{
	background:var(--card-bg);
	padding:20px;
	border-radius:8px;
	box-shadow:0 8px 30px var(--shadow);
	color:var(--text);
}

h1{margin:0 0 8px 0}

a{color:var(--accent)}
</style>
