import { BadRequestError, validateRequest } from "@stupidpickle/common";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();

router.post(
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
		console.log("inside login");
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError("Invalid credentials");
		}

		const passwordsMatch = await bcrypt.compare(password, existingUser.password);
		console.log("inside login2");

		if (!passwordsMatch) {
			throw new BadRequestError("Invalid Credentials");
		}
		console.log("inside login3");

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		);
		console.log("inside login4");

		// Store it on session object
		req.session = { jwt: userJwt };

		res.status(200).send(existingUser);
	}
);

export { router as login };
