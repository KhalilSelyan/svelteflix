<script>
	import { page } from '$app/stores';
	import '../app.css';
	import logo from '$lib/images/logo.svg';
	import tmdb from '$lib/images/tmdb.svg';
</script>

<nav class="mx-auto flex h-12 w-full max-w-[80rem] items-center justify-between p-4 text-accentcol">
	<a href="/">
		<img src={logo} alt="Logo" class="h-4 w-auto" />
	</a>
	<div class="flex gap-4">
		<a href="/search">Search</a>
		<a href="/watchlist">Watchlist</a>
		<a href="/login">Log in</a>
	</div>
</nav>

<main class:infinite={$page.data.infinite}>
	<slot />
</main>

<footer>
	<p class="flex h-20 items-center justify-center gap-2 text-sm">
		Data provided by{' '}
		<a href="https://www.themoviedb.org/" target="_blank" rel="noopener">
			<img src={tmdb} alt="The Movie Database" class="h-2 w-auto" />
		</a>
	</p>
</footer>

<style>
	main.infinite {
		overflow: hidden;
		height: 0;
		flex: 1;
	}
</style>
