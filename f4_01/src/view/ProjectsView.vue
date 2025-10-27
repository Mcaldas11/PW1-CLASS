<template>
	<section>
		<h1>Projetos</h1>
		<ul class="projects">
			<li>
				<h3>Projeto Alpha</h3>
				<p>Uma aplicação fictícia de gestão de tarefas com Vue e localStorage.</p>
			</li>
			<li>
				<h3>Projeto Beta</h3>
				<p>Uma loja online mockup com catálogo de produtos e filtros.</p>
			</li>
			<li>
				<h3>Projeto Gamma</h3>
				<p>Um dashboard simples para visualizar métricas e gráficos.</p>
			</li>
		</ul>
	</section>
</template>

<style scoped>
.projects{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.projects li{background:var(--card-bg);padding:14px;border-radius:8px;box-shadow:0 8px 30px var(--shadow);color:var(--text)}
h1{margin-bottom:8px}
</style>
