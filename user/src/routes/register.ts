import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-results";
import { User } from "../model/User";
import { connectRabbit } from "../rabbitChannel";

const router = express.Router();

export const register = router.post(
	"/register",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password").trim().notEmpty().withMessage("You must supply a password"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { username, email, password }: { username: string; email: string; password: string } =
			req.body;

		try {
			const user = await User.findOne({ email });
			console.log(user);
			if (user) {
				return res.status(400).json({ message: "User already exists" });
			}

			const encryptedPassword = await bcrypt.hash(password, 10);

			const messageChannel = await connectRabbit();

			try {
				const createdUser = await User.create({
					username,
					email,
					password: encryptedPassword,
				});

				messageChannel.sendToQueue("user", Buffer.from(JSON.stringify(createdUser)));

				return res.json({ user: createdUser });
			} catch (err) {
				console.log(err);
				return res.status(400).json({ message: "Error creating user" });
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: "Error registering user" });
		}
	}
);
