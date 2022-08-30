import express, { Request, Response } from "express";
import { Answer } from "../model/Answer";

const router = express.Router();

export const answerById = router.get("/answers/:answerId", async (req: Request, res: Response) => {
	const answerId = req.params.answerId;
	try {
		const answerFound = await Answer.findById(answerId);
		res.status(200).send(answerFound);
	} catch (err) {
		res.status(500).send(err);
	}
});
