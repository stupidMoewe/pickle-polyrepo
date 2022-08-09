import express, { Request, Response } from "express";
import { Question } from "../model/Question";

const router = express.Router();

export const questions = router.get("/questions", async (_req: Request, res: Response) => {
	try {
		console.log("inside questions");
		const questionsFound = await Question.find({});
		res.status(200).send(questionsFound);
	} catch (err) {
		res.status(500);
	}
});
