import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likeQuestionSlice = createApi({
	reducerPath: "like",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://192.168.1.36:4002",
	}),
	endpoints(builder) {
		return {
			likeQuestion: builder.mutation<boolean, string>({
				query(questionId) {
					return `/like/:${questionId}`;
				},
			}),
		};
	},
});

export const { useLikeQuestionMutation } = likeQuestionSlice;
