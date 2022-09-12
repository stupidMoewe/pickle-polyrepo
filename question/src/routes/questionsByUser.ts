import express, { Request, Response } from "express";
import { Question } from "../model/Question";
import { formatQuestion } from "../service/formatQuestion";
import { IQuestionFeed } from "./questionByIdFormated";

const router = express.Router();

export const questionsByUser = router.get(
	"/questions/user/:userId",
	async (req: Request, res: Response) => {
		const creatorId = req.params.userId;
		try {
			const questionsFound = await Question.find({ creatorId: { $in: creatorId } });
			const formatedQuestions = Array<IQuestionFeed>();
			for (const questionFound of questionsFound) {
				const formatedQuestion = await formatQuestion(questionFound.id, creatorId);
				if (formatedQuestion) {
					formatedQuestions.push(formatedQuestion);
				}
			}
			res.status(200).send(formatedQuestions);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
