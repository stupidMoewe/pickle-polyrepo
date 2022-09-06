import express, { Request, Response } from "express";

const router = express.Router();

export const logout = router.post("/logout", (req: Request, res: Response) => {
	try {
		req.session = null;
		res.send({ message: "Logged out" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error logging out" });
	}
});
