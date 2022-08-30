import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";

const router = express.Router();

export const questionAnswered = router.post(
	"/:questionId/answer/:answerId/user/:userId",
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		const questionId: string = req.params.questionId;
		const answerId: string = req.params.answerId;
		const userId: string = req.params.userId;

		const question = await Question.findById(questionId);
		const answer = await Answer.findById(answerId);

		if (question && answer) {
			question.answeredByUsers.push(userId);
			question.answeredCount++;

			answer.choozenByUser.push(userId);
			answer.answeredCount++;

			await question.save();
			await answer.save();
		}

		res.send({});
	}
);
