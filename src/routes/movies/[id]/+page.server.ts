import { get } from '$lib/api';
import type { MovieDetails } from '$lib/types.js';

export const load = async ({ params, fetch }) => {
	const movie = (await get(fetch, `movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	// correct the recommendation name
	// it comes out as "recommendations?6eaba0f5946bb7cedb6601f52d2158ca" instead of "recommendations"

	// @ts-expect-error - this is a hack to fix the recommendation name
	if (movie['recommendations?6eaba0f5946bb7cedb6601f52d2158ca']) {
		// @ts-expect-error - this is a hack to fix the recommendation name
		movie.recommendations = movie['recommendations?6eaba0f5946bb7cedb6601f52d2158ca'];
	}

	const trailer = movie.videos.results.find((video) => {
		return video.official && video.site === 'YouTube' && video.type === 'Trailer';
	});

	return {
		movie,
		trailer
	};
};
