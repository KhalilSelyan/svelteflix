<script lang="ts">
	import ResultsPage from '$lib/components/ResultsPage.svelte';

	export let data;
</script>

<div class="mx-auto flex max-w-[80rem] flex-col gap-4 px-4">
	<span class="text-5xl font-semibold">Search</span>

	<form>
		<div class="flex gap-2">
			<div class="relative w-60 rounded-full bg-zinc-200 px-4 py-2">
				<input
					type="text"
					name="query"
					value={data.query}
					autocomplete="off"
					spellcheck="false"
					placeholder="Search for a movie"
					class="max-w-44 bg-transparent text-zinc-700 outline-none placeholder:text-zinc-700"
				/>
				<button type="submit" class="absolute right-4 top-1.5 text-zinc-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-search"
						><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
					>
				</button>
			</div>
		</div>
	</form>

	{#if data.query}
		<ResultsPage movies={data.movies} next={null} />
	{/if}
</div>
