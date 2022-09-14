import express, { Request, Response } from "express";

const multer = require("multer");
const upload = multer({
	dest: "uploads/",
});

const router = express.Router();

export const uploadImage = router.post(
	"/upload-image",
	upload.single("image"),
	async (req: Request, res: Response) => {
		console.log("upload", req.file, req.body);
		return res.send("ok");
	}
);
