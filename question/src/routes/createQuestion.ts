import {
	currentUser,
	QuestionTypeOptions,
	requireAuth,
	validateRequest,
} from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { QuestionCreatedPublisher } from "../events/publishers/question-created-publisher";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

export type IAnswersType = "Text" | "Image" | "Video";

const router = express.Router();

interface IReq {
	title: string;
	answers: string[];
	answersTypes: IAnswersType[];
	questionType: QuestionTypeOptions;
}

export const createQuestion = router.post(
	"/create-question",
	currentUser,
	requireAuth,
	[
		body("title").not().isEmpty().withMessage("Title is required"),
		// body("answer1").not().isEmpty().withMessage("Answer 1 is required"),
		// body("answer2").not().isEmpty().withMessage("Answer 2 is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		console.log("createQuestion", req.currentUser);
		const { questionType, title, answers, answersTypes }: IReq = req.body;
		console.log("createQuestion", questionType, title, answers, answersTypes);

		const answersCreatedIds: string[] = [];

		// create
		for (let [index, answer] of answers.entries()) {
			const createdAnswer = Answer.build({
				answerType: answersTypes[index],
				content: answer,
				creatorId: req!.currentUser!.id,
				answeredCount: 0,
				choozenByUser: [],
			});
			await createdAnswer.save();
			answersCreatedIds.push(createdAnswer.id);
		}

		// create question
		const question = Question.build({
			questionType,
			title,
			possibleAnswers: answersCreatedIds,
			creatorId: req!.currentUser!.id,
			expirationDate: new Date().getSeconds() + 60 * 60 * 24,
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
