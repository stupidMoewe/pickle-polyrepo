import { Request, Response, NextFunction } from "express";
import { NotAuthError } from "../errors";

export const isAuth = (req: Request, _res: Response, next: NextFunction) => {
	if (!req.session.userId) {
		const error = new NotAuthError();
		next(error);
	}
	next();
};
