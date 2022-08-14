import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-results";
import { User } from "../models/User";

const router = express.Router();

export const login = router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const passwordsMatch = await bcrypt.compare(password, existingUser.password);

		if (!passwordsMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		req.session.userId = existingUser.id.toString();

		return res.status(200).send({ user: existingUser });
	}
);
