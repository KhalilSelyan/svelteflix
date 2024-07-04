import { get } from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types.js';
export async function load({ fetch }) {
	const [trending, now_playing, upcoming] = await Promise.all([
		get(fetch, 'movie/popular', { page: '1' }) as Promise<MovieList>,
		get(fetch, 'movie/now_playing', { page: '1' }) as Promise<MovieList>,
		get(fetch, 'movie/upcoming', { page: '1' }) as Promise<MovieList>
	]);

	const featured = trending.results[0];
	const details = (await get(fetch, `/movie/${featured.id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	return {
		trending,
		now_playing,
		upcoming,
		featured_data: details
	};
}
