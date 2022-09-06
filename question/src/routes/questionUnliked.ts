import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { QuestionLikedPublisher } from "../events/publishers/question-liked-publisher";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

export const questionUnliked = router.post(
	"/unlike/:questionId",
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		console.log("inside question unliked");
		const questionId: string = req.params.questionId;
		const userId: string = req.currentUser!.id;
		const question = await Question.findById(questionId);
		if (!question?.likedByUsers.includes(userId)) {
			return res.status(400).send({ message: "You have not liked this question" });
		}
		if (question) {
			question.likedCount -= 1;
			question.likedByUsers.splice(question.likedByUsers.indexOf(userId), 1);
			await question.save();

			// emit event to STAN
			// question:liked
			// -> User => increment nb of likes

			// new QuestionLikedPublisher(natsWrapper.client).publish({
			// 	questionId: question.id,
			// 	userId: userId, // the one who liked the question
			// 	creatorId: question.creatorId, // the creator of the question
			// });
		} else {
			return res.status(404).send({
				message: "Question not found",
			});
		}
		res.send({});
	}
);
