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

const multer = require("multer");
const upload = multer({
	dest: "uploads/",
});

export type IAnswersType = "Text" | "Image" | "Video";

const router = express.Router();

interface IReq {
	title: string;
	answers: string[];
	answersTypes: IAnswersType[];
	questionType: QuestionTypeOptions;
	answersImages: string[];
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
	upload.single("image"),
	async (req: Request, res: Response) => {
		console.log("inside create question");
		const { title, answers, answersImages }: IReq = req.body;

		const answersCreatedIds: string[] = [];

		// create
		// if answers text
		if (answers.length > 0) {
			for (let [index, answer] of answers.entries()) {
				const createdAnswer = Answer.build({
					content: answer,
					creatorId: req!.currentUser!.id,
					answeredCount: 0,
					choozenByUser: [],
				});
				await createdAnswer.save();
				answersCreatedIds.push(createdAnswer.id);
			}
		} else {
			// else answers images
			for (let [index, answer] of answersImages.entries()) {
				const createdAnswer = Answer.build({
					content: answer,
					creatorId: req!.currentUser!.id,
					answeredCount: 0,
					choozenByUser: [],
				});
				await createdAnswer.save();
				answersCreatedIds.push(createdAnswer.id);
			}
		}

		// create question
		const question = Question.build({
			title,
			possibleAnswers: answersCreatedIds,
			creatorId: req!.currentUser!.id,
			expirationDate: new Date().getSeconds() + 60 * 60 * 24,
		});
		await question.save();

		new QuestionCreatedPublisher(natsWrapper.client).publish({
			id: question.id,
			creatorId: question.creatorId,
			expirationDate: question.expirationDate,
		});

		return res.status(201).send(question);
	}
);
