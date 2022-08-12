import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	// console.log(errors);
	//req.body.errors = errors.array();

	// if (!errors.isEmpty()) {
	// 	throw new RequestValidationError(errors.array());
	// }

	res.status(400).json({ errors: errors.array() });

	// next(errors);
};
