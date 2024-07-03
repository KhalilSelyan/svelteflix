<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: images = movie.images;
	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
	$: logo = images.logos.find((image) => image.iso_639_1 === 'en') || images.logos[0];
</script>

<a href="/movies/{movie.id}" class="relative mx-auto flex max-w-[80rem]">
	<img
		class={`w-full aspect-[${backdrop.aspect_ratio}]`}
		src={media(backdrop.file_path, 1280)}
		alt={movie.title}
	/>
	<img
		class={`absolute left-4 top-0 h-full w-1/3 object-contain aspect-[${logo.aspect_ratio}]`}
		style="filter: drop-shadow(0 0 1rem black);"
		src={media(logo.file_path, 1280)}
		alt={movie.title}
	/>
</a>
