import express, { Request, Response } from "express";
import multer from "multer";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const upload = multer({
	// dest: "uploads/",
});

const router = express.Router();

// export const getImage = router.get("/image/:answerId", async (req: Request, res: Response) => {
// 	const answerId = req.params.answerId;
// 	res.set({ "Content-Type": "image/jpg" });
// 	return res.sendFile("/uploads/" + imageName, { root: "/usr/src/app" }, (err) => {
// 		console.log("err", err);
// 	});
// });

export const uploadImage = router.post(
	"/upload-image",
	upload.single("image"),
	async (req: Request, res: Response) => {
		console.log("uploading an image");
		const file = req.file;
		const params = {
			Bucket: "stupidpickle",
			Key: file!.originalname,
			Body: file!.buffer,
		};
		return s3.upload(params, (err: any, data: any) => {
			if (err) {
				console.log(err);
				return res.status(400).send({ message: "Something went wrong" });
			}
			console.log("data location: ", data.Location);
			return res.status(201).send({ imageLocation: data.Location });
		});
	}
);
