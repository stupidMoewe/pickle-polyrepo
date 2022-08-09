import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Question } from "../model/Question";
import { isAuth } from "../middlewares/isAuth";
import amqplib from "amqplib";
import { validateRequest } from "../middlewares/validate-results";

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
		const questionJSON = { title, answer1, answer2, creatorId: req.session.userId };
		const question = Question.build(questionJSON);
		const questionSaved = await question.save();
		const questionSavedId = questionSaved.toJSON().id.toString();

		// rabbit
		// produce a message to the queue "question" => to be refactored/wrapped in a function
		const q = "questionChannel";
		const message = await Question.findById(questionSavedId);
		if (!process.env.RABBIT) {
			throw new Error("RABBIT must be defined");
		}
		const connection = await amqplib.connect(process.env.RABBIT);
		const channel = await connection.createChannel();
		await channel.assertExchange(q, "fanout", { durable: true });
		const response = await channel.assertQueue("questionQueue", { durable: true });
		await channel.bindQueue(response.queue, q, "");
		channel.sendToQueue(q, Buffer.from(JSON.stringify(message)));
		console.log(response);

		// await channel.close();
		// await connection.close();

		return res.status(201).send(question);
	}
);
