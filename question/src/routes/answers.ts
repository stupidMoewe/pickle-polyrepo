import express, { Request, Response } from "express";
import { Answer } from "../model/Answer";

const router = express.Router();

export const answers = router.get("/answers", async (_req: Request, res: Response) => {
	try {
		const answersFound = await Answer.find({});
		res.status(200).send(answersFound);
	} catch (err) {
		res.status(500);
	}
});
