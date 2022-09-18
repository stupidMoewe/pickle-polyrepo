import { currentUser, requireAuth } from "@stupidpickle/common";
import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

router.put("/edit-profile", currentUser, requireAuth, async (req: Request, res: Response) => {
	const userId = req.currentUser!.id;
	const { username, email, imageName } = req.body;
	try {
		await User.findOneAndUpdate({ id: userId }, { username, email, imageName });
		return res.status(200).send({ message: "User updated" });
	} catch (err) {
		return res.status(500).json({ message: "Error editing user" });
	}
});

export { router as editProfile };
