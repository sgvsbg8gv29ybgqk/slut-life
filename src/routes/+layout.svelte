<script>
	import 'tailwindcss/tailwind.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/inter');

	.app {
		font-family: 'Inter', sans-serif;
	}
</style>
