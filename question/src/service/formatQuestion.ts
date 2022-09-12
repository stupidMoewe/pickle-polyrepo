// this service transforms the question object into a format
// that is adapted to the current user
// example: if the current user has already liked the question, and answered it

import { Question } from "../model/Question";
import { IQuestionFeed } from "../routes/questionByIdFormated";
const axios = require("axios").default;

export const formatQuestion = async (
	questionId: string,
	userId: string
): Promise<IQuestionFeed | null> => {
	const questionFound = await Question.findById(questionId);
	if (questionFound) {
		const question = { ...questionFound.toJSON() };
		const hasTheUserLikedTheQuestion: boolean = question.likedByUsers.includes(userId);
		question.isLikedByCurrentUser = hasTheUserLikedTheQuestion;
		delete question.likedByUsers;

		const hasTheUserAnsweredTheQuestion: boolean = question.answeredByUsers.includes(userId);
		question.isAnsweredByCurrentUser = hasTheUserAnsweredTheQuestion;
		delete question.answeredByUsers;

		const user = await axios
			.get("http://user:4001/user/" + question.creatorId)
			.then((response: { data: any }) => {
				return response.data;
			})
			.catch((error: any) => {
				console.log(error);
				return null;
			});

		const creator = {
			id: user.id,
			imageUrl: user.imageUrl,
			username: user.username,
		};

		question.creator = creator;
		delete question.creatorId;

		let answerChoozenId: string | null = null;

		for (const answerId of question.possibleAnswers) {
			await axios
				.get("http://question:4002/answers/" + answerId)
				.then((response: any) => {
					if (response.data.choozenByUser.includes(userId)) {
						answerChoozenId = answerId;
					}
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
		question.answerChoozenId = answerChoozenId;
		return question;
	}
	return null;
};
