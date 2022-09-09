import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { QuestionLikedPublisher } from "../events/publishers/question-liked-publisher";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

export const questionLiked = router.post(
	"/like/:questionId",
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		const questionId: string = req.params.questionId;
		const userId: string = req.currentUser!.id;
		const question = await Question.findById(questionId);

		let isLiked: boolean;

		// if question already liked => unlike
		if (question) {
			if (question.likedByUsers.includes(userId)) {
				question.likedCount -= 1;
				question.likedByUsers.splice(question.likedByUsers.indexOf(userId), 1);
				await question.save();
				isLiked = false;

				// new QuestionUnLikedPublisher(natsWrapper.client).publish({
				// 	questionId: question.id,
				// 	userId: userId, // the one who liked the question
				// 	creatorId: question.creatorId, // the creator of the question
				// });
			} else {
				question.likedCount += 1;
				question.likedByUsers.push(userId);
				await question.save();

				// emit event to STAN
				// question:liked
				// -> User => increment nb of likes

				new QuestionLikedPublisher(natsWrapper.client).publish({
					questionId: question.id,
					userId: userId, // the one who liked the question
					creatorId: question.creatorId, // the creator of the question
				});
				isLiked = true;
			}
		} else {
			return res.status(404).send({
				message: "Question not found",
			});
		}
		res.send({ isLiked });
	}
);
