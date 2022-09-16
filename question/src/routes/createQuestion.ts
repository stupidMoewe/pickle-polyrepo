import { currentUser, requireAuth, validateRequest } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { QuestionCreatedPublisher } from "../events/publishers/question-created-publisher";
import { Answer } from "../model/Answer";
import { Question } from "../model/Question";
import { natsWrapper } from "../nats-wrapper";

export type IAnswersType = "Text" | "Image" | "Video";

const router = express.Router();

interface IReq {
	contents: string[]; // sting of text or string of image name
	contentsType: IAnswersType[];
}

export const createQuestion = router.post(
	"/create-question",
	currentUser,
	requireAuth,
	validateRequest,
	async (req: Request, res: Response) => {
		console.log("creating a question");
		const { contents, contentsType }: IReq = req.body;
		console.log(contents, contentsType);

		const answersCreatedIds: string[] = [];

		for (const [index, content] of contents.entries()) {
			if (index == 0) {
				// title
				continue;
			} else {
				const createdAnswer = Answer.build({
					content,
					creatorId: req!.currentUser!.id,
					answerType: contentsType[index],
				});
				await createdAnswer.save();
				answersCreatedIds.push(createdAnswer.id);
			}
		}

		const question = Question.build({
			title: contents[0],
			titleType: contentsType[0],
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

		// create
		// // if answers text
		// if (answers.length > 0) {
		// 	for (let [index, answer] of answers.entries()) {
		// 		const createdAnswer = Answer.build({
		// 			content: answer,
		// 			creatorId: req!.currentUser!.id,
		// 			answeredCount: 0,
		// 			choozenByUser: [],
		// 		});
		// 		await createdAnswer.save();
		// 		answersCreatedIds.push(createdAnswer.id);
		// 	}
		// } else {
		// 	// else answers images
		// 	for (let [index, answer] of answersImages.entries()) {
		// 		const createdAnswer = Answer.build({
		// 			content: answer,
		// 			creatorId: req!.currentUser!.id,
		// 			answeredCount: 0,
		// 			choozenByUser: [],
		// 		});
		// 		await createdAnswer.save();
		// 		answersCreatedIds.push(createdAnswer.id);
		// 	}
		// }

		// // create question
		// const question = Question.build({
		// 	title,
		// 	possibleAnswers: answersCreatedIds,
		// 	creatorId: req!.currentUser!.id,
		// 	expirationDate: new Date().getSeconds() + 60 * 60 * 24,
		// });
		// await question.save();

		// new QuestionCreatedPublisher(natsWrapper.client).publish({
		// 	id: question.id,
		// 	creatorId: question.creatorId,
		// 	expirationDate: question.expirationDate,
		// });

		return res.status(201).send(question);
	}
);
