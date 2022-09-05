import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likeQuestionSlice = createApi({
	reducerPath: "like",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4002",
	}),
	endpoints(builder) {
		// console.log(builder.);
		return {
			likeQuestion: builder.mutation<boolean, string>({
				query(questionId) {
					// const { questionId } = data;
					console.log("here", questionId);
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
