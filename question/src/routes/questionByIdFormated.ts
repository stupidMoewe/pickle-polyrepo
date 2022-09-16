import express, { Request, Response } from "express";
import { formatQuestion } from "../service/formatQuestion";
const axios = require("axios").default;

const router = express.Router();

export interface IQuestionFeed {
	answeredCount: number;
	id: string;
	title: string;
	possibleAnswers: string[];
	likedCount: number;
	commentedCount: number;
	commentedByUsers: string[];
	isLikedByCurrentUser: boolean;
	isAnsweredByCurrentUser: boolean;
	answeredByUser: string[];
	expirationDate: number;
	answerChoozenId: string;
	creator: {
		id: string;
		imageUrl: string;
		username: string;
	};
}

export const questionByIdFormated = router.get(
	"/questions/formated/:questionId/:userId",
	async (req: Request, res: Response) => {
		const questionId = req.params.questionId;
		const userId = req.params.userId;

		try {
			const question = await formatQuestion(questionId, userId);
			if (question) {
				return res.status(200).send(question);
			}
			return res.status(404).send({ message: "Question not found" });
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
