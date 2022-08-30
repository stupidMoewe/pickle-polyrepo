import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { validateRequest } from "../middlewares/validate-results";
import { User } from "../models/User";
import { natsWrapper } from "../nats-wrapper";

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

			try {
				const createdUser = await User.create({
					username,
					email,
					password: encryptedPassword,
				});

				new UserCreatedPublisher(natsWrapper.client).publish({
					id: createdUser.id,
					username: createdUser.username,
					email: createdUser.email,
				});

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
