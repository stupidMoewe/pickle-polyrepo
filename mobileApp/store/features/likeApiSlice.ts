import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likeQuestionSlice = createApi({
	reducerPath: "like",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://192.168.0.31:4002",
	}),
	endpoints(builder) {
		return {
			likeQuestion: builder.mutation<boolean, string>({
				query(questionId) {
					// const { questionId } = data;
					return {
						url: `/like/:${questionId}`,
						method: "POST",
					};
				},
			}),
		};
	},
});

export const { useLikeQuestionMutation } = likeQuestionSlice;
