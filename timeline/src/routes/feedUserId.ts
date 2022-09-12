import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { connectRedis } from "../redisClient";
const axios = require("axios").default;

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
						.get("http://question:4002/questions/formated/" + questionId + "/" + userId)
						.then((response) => {
							questionsFetched.push(response.data);
						})
						.catch((error) => {
							return res.status(500).send(error);
						});
				}
			}

			res.status(200).send(questionsFetched);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
