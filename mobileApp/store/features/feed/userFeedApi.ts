import { IAnswer, IQuestionFeed } from "../../../types";
import { apiSlice } from "../../app/apiSlice";
import { questionServiceBaseUrl, timelineServiceBaseUrl } from "../baseUrl";

interface IAnswerQuestion {
	questionId: string;
	answerId: string;
}

function providesList<R extends { id: string | number }[], T extends string>(
	resultsWithIds: R | undefined,
	tagType: T
) {
	return resultsWithIds
		? [
				{ type: tagType, id: "LIST" },
				...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
		  ]
		: [{ type: tagType, id: "LIST" }];
}

// Define a service using a base URL and expected endpoints
export const questionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get user profile questions
		getUserQuestions: builder.query<IQuestionFeed[], string>({
			query: (userId) => `${questionServiceBaseUrl}/questions/user/${userId}`,
			providesTags: (result) => providesList(result, "Question"),
		}),

		// get user feed
		getUserFeed: builder.query<IQuestionFeed[], void>({
			query: () => `${timelineServiceBaseUrl}/`,
			providesTags: (result) => providesList(result, "Timeline"),
		}),

		// get question
		getQuestion: builder.query<IQuestionFeed, string>({
			query: (questionId) => `${questionServiceBaseUrl}/questions/${questionId}`,
			providesTags: (result, error, id) => [{ type: "Timeline", id }],
		}),

		// get answer
		getAnswersQuestion: builder.query<IAnswer[], string>({
			query: (questionId) => `${questionServiceBaseUrl}/answers/question/${questionId}`,
			providesTags: (result) => providesList(result, "Answer"),
		}),

		// get answer
		getAnswer: builder.query<IAnswer, string>({
			query: (answerId) => `${questionServiceBaseUrl}/answers/${answerId}`,
			providesTags: (result, error, id) => [{ type: "Timeline", id }],
		}),

		// // get answer
		// getImage: builder.query<any, string>({
		// 	query: (imageName) => ({
		// 		url: `${questionServiceBaseUrl}/image/${imageName}`,
		// 		prepareHeaders: (headers: any) => {
		// 			headers.set("Content-Type", "image/png");
		// 			return headers;
		// 		},
		// 	}),
		// }),

		// create question
		createQuestion: builder.mutation<Partial<IQuestionFeed>, object>({
			query: (body) => ({
				url: `${questionServiceBaseUrl}/create-question`,
				method: "POST",
				prepareHeaders: (headers: any) => {
					headers.set("Content-Type", "multipart/form-data");
					return headers;
				},
				body,
			}),
			invalidatesTags: ["Timeline", "Question"],
		}),

		uploadImage: builder.mutation<object, object>({
			query: (body) => ({
				url: `${questionServiceBaseUrl}/upload-image`,
				method: "POST",
				prepareHeaders: (headers: any) => {
					headers.set("Content-Type", "multipart/form-data");
					return headers;
				},
				body,
			}),

			// invalidatesTags: ["Timeline", "Question"],
		}),

		// answer a question
		answerQuestion: builder.mutation<object, IAnswerQuestion>({
			query: ({ questionId, answerId }: IAnswerQuestion) => ({
				url: `${questionServiceBaseUrl}/${questionId}/answer/${answerId}`,
				method: "POST",
			}),
			async onQueryStarted({ questionId, answerId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					questionApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
						const question = draft?.find((q) => q.id === questionId);
						const answer = draft?.find((a) => a.id === answerId);
						// const question
						if (question && !question.isAnsweredByCurrentUser) {
							question.answeredCount += 1;
							question.isAnsweredByCurrentUser = true;
						}
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ["Timeline", "Answer", "Question"],
		}),

		// like a question
		like: builder.mutation<object, string>({
			query: (questionId: string) => ({
				url: `${questionServiceBaseUrl}/like/${questionId}`,
				method: "POST",
			}),
			async onQueryStarted(questionId, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					questionApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
						const question = draft?.find((q) => q.id === questionId);
						// const question
						if (question && !question.isLikedByCurrentUser) {
							question.likedCount += 1;
							question.isLikedByCurrentUser = true;
						} else if (question && question.isLikedByCurrentUser) {
							question.likedCount -= 1;
							question.isLikedByCurrentUser = false;
						}
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ["Timeline", "Question"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetUserFeedQuery,
	useGetUserQuestionsQuery,
	useCreateQuestionMutation,
	useAnswerQuestionMutation,
	useLikeMutation,
	useGetAnswerQuery,
	useGetAnswersQuestionQuery,
	useUploadImageMutation,
} = questionApi;
