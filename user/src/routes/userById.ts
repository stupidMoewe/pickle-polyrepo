import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

export const userById = router.get("/user/:userId", async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId);
	res.send(user);
});
