import express, { Request, Response } from "express";
import { connectRedis } from "../redisClient";
const axios = require("axios").default;

const router = express.Router();

export const feedUserId = router.get("/:userId", async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		const redisClient = await connectRedis();
		const feed = await redisClient.lRange(userId, 0, -1); // users1
		const questionsFetched = Array();
		for (const questionId of feed) {
			if (questionId !== "first") {
				await axios
					.get("http://192.168.1.36:4002/questions/" + questionId)
					.then((response) => {
						questionsFetched.push(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		// filter the question to custumize it to the user
		// change liked by user by isLikedByCurrentUser
		questionsFetched.forEach((question) => {
			const hasTheUserLikedTheQuestion: boolean = question.likedByUsers.includes(userId);
			question.isLikedByCurrentUser = hasTheUserLikedTheQuestion;
			delete question.likedByUsers;
		});

		res.status(200).send(questionsFetched);
	} catch (err) {
		res.status(500).send(err);
	}
});
