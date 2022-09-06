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
		console.log("feedUserId", req.currentUser);
		const userId = req.currentUser!.id.toString();
		try {
			const redisClient = await connectRedis();
			const feed = await redisClient.lRange(userId, 0, -1);
			const questionsFetched = Array();
			for (const questionId of feed) {
				if (questionId !== "first") {
					const test = await axios
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
	}
);
