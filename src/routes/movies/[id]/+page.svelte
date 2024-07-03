<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import Hero from './Hero.svelte';

	export let data;
	console.log(data.movie);
</script>

<div class="mx-auto flex h-full max-w-[80rem] flex-col gap-4 px-4">
	<Hero movie={data.movie} />

	<div class="my-8 grid w-full gap-8 sm:grid-cols-2">
		{#if data.trailer}
			<iframe
				class="aspect-video w-96 sm:w-full"
				title="youtube video player"
				src={`https://www.youtube.com/embed/${data.trailer.key}`}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		{/if}

		<dl
			class="sim:[grid-template-columns:max-content_1fr_max-content_1fr] mid:[grid-template-columns:1fr_1fr] mid:h-0 grid items-center gap-8 [grid-template-columns:max-content_1fr]"
		>
			{#if data.movie.release_date}
				<dt class="top-[0.2rem] h-0 text-sm uppercase opacity-80">Released</dt>
				<dd class="m-0 h-0">{data.movie.release_date}</dd>
			{/if}

			{#if data.movie.runtime}
				<dt class="top-[0.2rem] h-0 text-sm uppercase opacity-80">Runtime</dt>
				<dd class="m-0 h-0">{data.movie.runtime} minutes</dd>
			{/if}

			{#if data.movie.budget}
				<dt class="top-1 h-[0.2rem] text-sm uppercase opacity-80">Budget</dt>
				<dd class="m-0 h-0">${Math.round(data.movie.budget * 1e-6)}M</dd>
			{/if}

			{#if data.movie.revenue}
				<dt class="top-1 h-[0.2rem] text-sm uppercase opacity-80">Revenue</dt>
				<dd class="m-0 h-0">${Math.round(data.movie.revenue * 1e-6)}M</dd>
			{/if}

			{#if data.movie.genres.length}
				<dt class="top-1 h-[0.2rem] text-sm uppercase opacity-80">Genres</dt>
				<dd class="m-0 h-0 [grid-column:2/5]">
					{data.movie.genres.map((genre) => genre.name).join(', ')}
				</dd>
			{/if}

			{#if data.movie.vote_average}
				<dt class="top-1 h-[0.2rem] text-sm uppercase opacity-80">Rating</dt>
				<dd class="m-0 h-0">{data.movie.vote_average} / 10</dd>
			{/if}
		</dl>
	</div>

	{#if data.movie.recommendations.results.length > 0}
		<Carousel
			movies={data.movie.recommendations.results}
			view={{
				title: 'You might also like',
				endpoint: ''
			}}
		/>
	{/if}
</div>
