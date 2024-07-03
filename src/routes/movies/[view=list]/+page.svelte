<script lang="ts">
	import { get } from '$lib/api';
	import ResultsPage from '$lib/components/ResultsPage.svelte';
	import type { MovieList } from '$lib/types.js';

	export let data;
	let appending = false;
</script>

<div class="mx-auto flex h-full max-w-[80rem] flex-col px-4">
	<h1 class="my-4 text-5xl font-semibold">{data.title}</h1>
	<ResultsPage
		movies={data.movies}
		next={data.next_page ? `/movies/${data.view}?page=${data.next_page}` : null}
		on:load-more={async () => {
			if (!data.next_page || appending) return;

			const next = (await get(fetch, data.endpoint, {
				page: String(data.next_page)
			})) as MovieList;

			data.movies = [...data.movies, ...next.results];
			data.next_page = next.page < next.total_pages ? next.page + 1 : null;
		}}
	/>
</div>
