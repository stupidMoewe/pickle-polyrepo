import express, { Request, Response } from "express";
import { connectRedis } from "../redisClient";
const axios = require("axios").default;

const router = express.Router();

export const feedUserId = router.get("/:userId", async (req: Request, res: Response) => {
	const userId = req.params.userId;
	try {
		const redisClient = await connectRedis();
		const feed = await redisClient.lRange(userId, 0, -1); // users1
		const questionsFetched = [];
		for (const questionId of feed) {
			if (questionId !== "first") {
				await axios
					.get("http://192.168.1.36:4002/questions/" + questionId)
					.then((response) => {
						return questionsFetched.push(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		res.status(200).send(questionsFetched);
	} catch (err) {
		res.status(500).send(err);
	}
});
