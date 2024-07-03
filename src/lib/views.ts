export interface View {
	title: string;
	endpoint: string;
}

export const view = ['trending', 'now_playing', 'upcoming'] as const;
export type ViewName = (typeof view)[number];
export const views: Record<ViewName, View> = {
	trending: {
		title: 'Trending',
		endpoint: '/trending/movie/day'
	},
	now_playing: {
		title: 'Now Playing',
		endpoint: '/movie/now_playing'
	},
	upcoming: {
		title: 'Upcoming',
		endpoint: '/movie/upcoming'
	}
};
