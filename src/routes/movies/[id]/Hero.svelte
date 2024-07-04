<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';
	import { smoothload } from '$lib/actions';
	import Stars from '$lib/components/Stars.svelte';

	export let movie: MovieDetails;
	$: backdrop =
		movie.images.backdrops.find((backdrop) => !backdrop.iso_639_1) || movie.images.backdrops[0];
</script>

<div
	class="relative grid bg-black lg:[grid-template-columns:1fr_80rem] lg:[grid-template-rows:auto]"
>
	<div
		class="mt-4 flex flex-col items-center after:absolute after:bottom-0 after:left-0 after:h-32 after:w-full after:bg-gradient-to-t after:from-black after:to-transparent lg:[grid-column:2/3] lg:after:h-full lg:after:w-60 lg:after:bg-gradient-to-r lg:after:from-black lg:after:to-transparent"
		style="after:content: '';"
	>
		<img
			class="block w-full"
			style={`aspect-ration: ${backdrop.aspect_ratio}`}
			src={media(backdrop.file_path, 1280)}
			alt={`Poster for ${movie.title}`}
			use:smoothload
		/>
	</div>

	<div
		class="-mt-12 flex flex-col justify-center gap-4 px-4 lg:absolute lg:left-0 lg:top-0 lg:mt-0 lg:h-full lg:w-[40rem] lg:drop-shadow-sv lg:[grid-column:1/2]"
	>
		<h1 class="m-0 text-4xl">{movie.title}</h1>
		<Stars vote_average={movie.vote_average} vote_count={movie.vote_count} />

		<p class="m-0 text-xl">{movie.overview}</p>
	</div>
</div>
