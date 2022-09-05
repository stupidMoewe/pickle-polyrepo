import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timelineSlice = createApi({
	reducerPath: "timeline",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4004",
	}),
	endpoints(builder) {
		return {
			fetchTimeline: builder.query<Object[], string>({
				query(userId) {
					return `/${userId}`;
				},
			}),
		};
	},
});

export const { useFetchTimelineQuery } = timelineSlice;
