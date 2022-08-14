import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

export const me = router.get("/me", async (req: Request, res: Response) => {
	const userId = req.session.userId;
	if (userId) {
		try {
			const user = await User.findOne({ id: userId });
			res.send(user);
		} catch (err) {
			res.status(500).json({ message: "Error getting user" });
		}
	} else {
		res.send(null);
	}
});
