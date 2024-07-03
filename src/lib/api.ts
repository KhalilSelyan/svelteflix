export const baseUrl = 'https://api.movies.tastejs.com/';
export const mediaBaseUrl = 'https://image.tmdb.org/t/p';

const cache = new Map();

export async function get(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	params?: Record<string, string>
) {
	const q = new URLSearchParams(params);
	const url = `${baseUrl}${endpoint}?${q}`;

	if (cache.has(url)) {
		return cache.get(url);
	}

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Failed to fetch ${endpoint}`);
	}

	const data = await res.json();

	cache.set(url, data);

	return data;
}

export function media(file_path: string, width: number) {
	return `${mediaBaseUrl}/w${width}${file_path}`;
}
