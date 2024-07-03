<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import { views } from '$lib/views';
	import Hero from './Hero.svelte';

	export let data;
</script>

<h1 class=" mx-auto mt-4 max-w-[80rem] px-4 text-5xl font-semibold leading-[1.1]">
	Top trending movies
</h1>

<div class="mx-auto flex h-full max-w-[80rem] flex-col px-4">
	<Hero movie={data.featured_data} />

	<Carousel href={'movies/trending'} view={views.trending} movies={data.trending.results} />

	<Carousel
		href={'movies/now_playing'}
		view={views.now_playing}
		movies={data.now_playing.results}
	/>

	<Carousel href={'movies/upcoming'} view={views.upcoming} movies={data.upcoming.results} />
</div>
