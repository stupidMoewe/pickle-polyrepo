import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuestionFeed } from "../../../types";
import { timelineServiceBaseUrl } from "../baseUrl";

// Define a service using a base URL and expected endpoints
export const timelineApi = createApi({
	reducerPath: "timelineApi",
	baseQuery: fetchBaseQuery({ baseUrl: timelineServiceBaseUrl }),
	endpoints: (builder) => ({
		getUserFeed: builder.query<IQuestionFeed[], string>({
			query: () => "",
		}),
	}),
});

export const { useGetUserFeedQuery } = timelineApi;
