import express, { Request, Response } from "express";
import { connectRedis } from "../redisClient";
const axios = require("axios").default;
import { currentUser, requireAuth } from "@stupidpickle/common";

const router = express.Router();

export const feedUserId = router.get(
	"/",
	currentUser,
	requireAuth,
	async (req: Request, res: Response) => {
		const userId = req.currentUser!.id.toString();
		try {
			const redisClient = await connectRedis();
			const feed = await redisClient.lRange(userId, 0, -1);
			const questionsFetched = Array();
			for (const questionId of feed) {
				if (questionId !== "first") {
					await axios
						.get("http://question:4002/questions/" + questionId)
						.then((response) => {
							questionsFetched.push(response.data);
						})
						.catch((error) => {
							console.log(error);
							// res.status(500).send(error);
						});
				}
			}
			// filter the question to custumize it to the user
			for (const question of questionsFetched) {
				const hasTheUserLikedTheQuestion: boolean = question.likedByUsers.includes(userId);
				question.isLikedByCurrentUser = hasTheUserLikedTheQuestion;
				delete question.likedByUsers;

				const hasTheUserAnsweredTheQuestion: boolean =
					question.answeredByUsers.includes(userId);
				question.isAnsweredByCurrentUser = hasTheUserAnsweredTheQuestion;
				delete question.answeredByUsers;

				let answerChoozenId: string | null = null;

				for (const answerId of question.possibleAnswers) {
					await axios
						.get("http://question:4002/answers/" + answerId)
						.then((response) => {
							if (response.data.choozenByUser.includes(userId)) {
								answerChoozenId = answerId;
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
				question.answerChoozenId = answerChoozenId;
			}

			res.status(200).send(questionsFetched);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
