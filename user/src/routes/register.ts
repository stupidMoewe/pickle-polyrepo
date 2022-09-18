import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { User } from "../models/User";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

export const register = router.post(
	"/register",
	[
		body("username").isLength({ min: 6 }).withMessage("Must be at least 6 characters long"),
		body("email").isEmail().withMessage("Email must be valid"),
		body("password").isLength({ min: 6 }).withMessage("Must be at least 6 characters long"),
	],
	// validateRequest,
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).send(errors.array());
		}
		const { username, email, password }: { username: string; email: string; password: string } =
			req.body;

		console.log("registering a user", username, email, password);

		try {
			const user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ fields: ["username", "email"], message: "User already exists" });
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
