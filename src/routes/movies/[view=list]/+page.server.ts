import { get } from '$lib/api';
import type { MovieList } from '$lib/types.js';
import { views, type ViewName } from '$lib/views.js';

export async function load({ params, url, fetch }) {
	const viewName = params.view as ViewName;
	const specific_view = views[viewName];

	const page = url.searchParams.get('page') || '1';

	const data = (await get(fetch, specific_view.endpoint, {
		page
	})) as MovieList;

	return {
		view: params.view,
		title: specific_view.title,
		endpoint: specific_view.endpoint,
		movies: data.results,
		next_page: data.page < data.total_pages ? data.page + 1 : null,
		infinite: true
	};
}
