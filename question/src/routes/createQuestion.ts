import {
	currentUser,
	requireAuth,
	validateRequest,
	QuestionTypeOptions,
} from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { QuestionCreatedPublisher } from "../events/publishers/question-created-publisher";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

interface IReq {
	questionType: QuestionTypeOptions;
	title: string;
	answer1: string;
	answer2: string;
	answer3?: string;
	answer4?: string;
}

export const createQuestion = router.post(
	"/create-question",
	currentUser,
	requireAuth,
	[
		body("title").not().isEmpty().withMessage("Title is required"),
		body("answer1").not().isEmpty().withMessage("Answer 1 is required"),
		body("answer2").not().isEmpty().withMessage("Answer 2 is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		console.log("createQuestion", req.currentUser);
		const { questionType, title, answer1, answer2, answer3, answer4 }: IReq = req.body;
		const question = Question.build({
			questionType,
			title,
			answer1,
			answer2,
			answer3,
			answer4,
			creatorId: req!.currentUser!.id,
			likes: 0,
			expirationDate: new Date().getSeconds() + 60 * 60 * 24, // 1 day
		});
		await question.save();

		new QuestionCreatedPublisher(natsWrapper.client).publish({
			id: question.id,
			questionType: questionType,
			creatorId: question.creatorId,
			expirationDate: question.expirationDate,
		});

		return res.status(201).send(question);
	}
);
