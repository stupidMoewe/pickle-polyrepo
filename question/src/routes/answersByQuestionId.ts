import express, { Request, Response } from "express";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";

const router = express.Router();

export const answersByQuestionId = router.get(
	"/answers/question/:questionId",
	async (req: Request, res: Response) => {
		const questionId = req.params.questionId;
		try {
			const questionFound = await Question.findById(questionId);
			const answersId = questionFound!.possibleAnswers;
			const answers = Array();
			for (const answerId of answersId) {
				const answer = await Answer.findById(answerId);
				answers.push(answer);
			}
			res.status(200).send(answers);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
