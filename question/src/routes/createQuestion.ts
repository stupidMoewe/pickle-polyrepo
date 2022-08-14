import express, { Request, Response } from "express";
import { body } from "express-validator";
import { QuestionCreatedPublisher } from "../events/publishers/question-created-publisher";
import { isAuth } from "../middlewares/isAuth";
import { validateRequest } from "../middlewares/validate-results";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

export const createQuestion = router.post(
	"/create-question",
	isAuth,
	[
		body("title").not().isEmpty().withMessage("Title is required"),
		body("answer1").not().isEmpty().withMessage("Answer 1 is required"),
		body("answer2").not().isEmpty().withMessage("Answer 2 is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { title, answer1, answer2 } = req.body;
		if (!req.session.userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		console.log(req.session.userId);
		// const questionJSON = { title, answer1, answer2, creatorId: req.session.userId };
		const question = Question.build({ title, answer1, answer2, creatorId: req.session.userId });
		await question.save();

		new QuestionCreatedPublisher(natsWrapper.client).publish({
			id: question.id,
			title: question.title,
			answer1: question.answer1,
			answer2: question.answer2,
			creatorId: question.creatorId,
		});

		return res.status(201).send(question);
	}
);
