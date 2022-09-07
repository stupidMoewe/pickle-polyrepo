import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { QuestionAnsweredPublisher } from "../events/publishers/question-answered-publisher";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

export const questionAnswered = router.post(
	"/:questionId/answer/:answerId",
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		try {
			const questionId: string = req.params.questionId;
			const answerId: string = req.params.answerId;
			const userId: string = req.currentUser!.id.toString();

			const question = await Question.findById(questionId);
			const answer = await Answer.findById(answerId);

			if (question?.answeredByUsers.includes(userId)) {
				return res.status(404).send({
					message: "Question already answered by user",
				});
			}

			question!.answeredByUsers.push(userId);
			question!.answeredCount++;

			answer!.choozenByUser.push(userId);
			answer!.answeredCount++;

			await question!.save();
			await answer!.save();

			// add NATS event in direction of user services
			new QuestionAnsweredPublisher(natsWrapper.client).publish({
				questionId: questionId,
				answerId: answerId,
				userId: userId, // the one answered the question
			});

			res.send({
				questionId,
				answerId,
			});
		} catch (err) {
			return res.status(404).send({
				message: "Question or Answer not found",
			});
		}
	}
);
