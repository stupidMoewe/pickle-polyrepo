import express, { Request, Response } from "express";
import { Question } from "../model/Question";

const router = express.Router();

export const questionById = router.get(
	"/questions/:questionId",
	async (req: Request, res: Response) => {
		const questionId = req.params.questionId;
		try {
			const questionFound = await Question.findById(questionId);
			res.status(200).send(questionFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
