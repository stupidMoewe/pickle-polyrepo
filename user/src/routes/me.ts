import { currentUser } from "@stupidpickle/common";
import express, { Request, Response } from "express";

const router = express.Router();

export const me = router.get("/me", currentUser, async (req: Request, res: Response) => {
	res.send({ currentUser: req.currentUser || null });
});
