import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

export const users = router.get(
	"/users",
	currentUser,
	requireAuth,
	async (_req: Request, res: Response) => {
		const users = await User.find();
		res.send(users);
	}
);
