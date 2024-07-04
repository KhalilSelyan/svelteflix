import { PUBLIC_TMDB_ACCESS_TOKEN, PUBLIC_TMDB_API_KEY } from '$env/static/public';

// export const baseUrl = 'https://api.movies.tastejs.com/';
export const baseUrl = 'https://api.themoviedb.org/3/';
export const mediaBaseUrl = 'https://image.tmdb.org/t/p';
const cache = new Map();

export async function get(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	params?: Record<string, string>
) {
	const q = new URLSearchParams(params);
	const url = `${baseUrl}${endpoint}?${q}`;

	const key = `${url}?${PUBLIC_TMDB_API_KEY}`;

	if (cache.has(key)) {
		return cache.get(key);
	}

	const res = await fetch(key, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${PUBLIC_TMDB_ACCESS_TOKEN}`
		}
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${endpoint}`);
	}

	const data = await res.json();

	cache.set(key, data);

	return data;
}

export function media(file_path: string, width: number) {
	return `${mediaBaseUrl}/w${width}${file_path}`;
}
