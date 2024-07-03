<script lang="ts">
	import { media } from '$lib/api';

	import type { MovieListResult } from '$lib/types';
	import type { View } from '$lib/views';

	export let movies: MovieListResult[];
	export let view: View;
	export let href: string | null = null;
</script>

<h1 class="my-4 text-3xl font-semibold leading-[1.1]">
	{view.title}
	{#if href}
		<a {href} class="text-xl font-normal text-accentcol underline">See all</a>
	{/if}
</h1>

<div
	class="carousel scroll-snap-x-mandatory flex h-[clamp(10rem,25vw,20rem)] scroll-px-[var(--padding)] gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap px-[var(--padding)]"
>
	{#each movies as movie}
		<a href="/movies/{movie.id}" class="scroll-snap-start aspect-[2/3] h-full">
			<img class="h-full w-full" src={media(movie.poster_path, 500)} alt={movie.title} />
		</a>
	{/each}
</div>

<style>
	.carousel {
		--padding: max(1rem, calc(1rem + (100vw - 80rem) / 2));
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}
</style>
