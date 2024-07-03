<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { media } from '$lib/api';
	import type { MovieDetails, MovieListResult } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let movies: Array<MovieListResult | MovieDetails>;
	export let next: string | null;

	const dispatch = createEventDispatcher();

	let viewport: HTMLDivElement;
	let results: HTMLDivElement;
	let item_width: number;
	let item_height: number;
	let num_columns: number;

	// render movies.slice(a, b);
	let first_item = 0;
	let first_invisible = movies.length;
	let padding_top = 0;
	let padding_bottom = 0;

	function handle_resize() {
		const first = results.firstChild as HTMLDivElement;

		item_width = first.offsetWidth;
		item_height = first.offsetHeight;

		num_columns = Number(getComputedStyle(results).getPropertyValue('--columns'));

		handle_scroll();
	}

	function handle_scroll() {
		const { scrollHeight, scrollTop, clientHeight } = viewport;
		const remaining = scrollHeight - (scrollTop + clientHeight);

		if (remaining < 400) {
			dispatch('load-more');
		}

		first_item = Math.floor(scrollTop / item_height) * num_columns;
		first_invisible = Math.ceil((scrollTop + clientHeight) / item_height) * num_columns;

		padding_top = Math.floor(first_item / num_columns) * item_height;
		padding_bottom = Math.floor((movies.length - first_invisible) / num_columns) * item_height;
	}

	onMount(handle_resize);

	afterNavigate(() => {
		viewport.scrollTo(0, 0);
	});

	function redirectToMoviePageInTMDB(movie_id: number, title: string) {
		// replace space and special characters with hyphen
		const clean_title = title.replace(/[^a-zA-Z0-9]/g, '-');
		// check for double hyphens and replace with single hyphen
		const fully_clean_title = clean_title.replace(/--/g, '-');
		return `https://www.themoviedb.org/movie/${movie_id}-${fully_clean_title}`;
	}
</script>

<svelte:window on:resize={handle_resize} />

<div class="overflow-y-auto scrollbar-none" bind:this={viewport} on:scroll={handle_scroll}>
	<div
		bind:this={results}
		class="results [grid-template-rows: 2em repeat(auto, 1fr)] grid gap-4 [grid-template-columns:repeat(var(--columns),minmax(0,1fr))]"
		style:padding-top="{padding_top}px"
		style:padding-bottom="{padding_bottom}px"
	>
		{#each movies.slice(first_item, first_invisible) as movie}
			<!-- href={redirectToMoviePageInTMDB(movie.id, movie.title)} -->
			<a href="/movies/{movie.id}" target="_blank" rel="noopener noreferrer">
				{#if movie.poster_path}
					<img
						alt={movie.title}
						src={media(movie.poster_path, 500)}
						class="aspect-[2/3] h-auto w-full"
					/>
				{:else}
					<span>{movie.title}</span>
				{/if}
			</a>
		{/each}
	</div>

	{#if next}
		<a href={next}>next page</a>
	{/if}
</div>

<style>
	.results {
		--columns: 2;
	}

	@media (min-width: 30rem) {
		.results {
			--columns: 3;
		}
	}

	@media (min-width: 40rem) {
		.results {
			--columns: 4;
		}
	}

	@media (min-width: 50rem) {
		.results {
			--columns: 5;
		}
	}

	@media (min-width: 60rem) {
		.results {
			--columns: 6;
		}
	}
</style>
