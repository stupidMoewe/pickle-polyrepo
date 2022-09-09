import { currentUser } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

export const me = router.get("/me", currentUser, async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.currentUser?.id);
		return res.send(user);
	} catch (err) {
		return res.status(500).send(err);
	}
});
