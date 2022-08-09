import express, { Request, Response } from "express";
import { Question } from "../model/Question";

const router = express.Router();

export const questionsByUser = router.get(
	"/questions/user/:userId",
	async (req: Request, res: Response) => {
		const creatorId = req.params.userId;
		try {
			const questionsFound = await Question.find({ creatorId: { $in: creatorId } });
			res.status(200).send(questionsFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
