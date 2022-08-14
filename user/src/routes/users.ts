import express, { Request, Response } from "express";
import { User } from "../models/User";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

export const users = router.get("/users", isAuth, async (_req: Request, res: Response) => {
	const users = await User.find();
	res.send(users);
});
