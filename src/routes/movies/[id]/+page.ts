import { get } from '$lib/api.js';
import type { MovieDetails } from '$lib/types.js';

export const load = async ({ params, fetch }) => {
	const movie = (await get(fetch, `/movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	const trailer = movie.videos.results.find((video) => {
		return video.official && video.site === 'YouTube' && video.type === 'Trailer';
	});

	return {
		movie,
		trailer
	};
};
