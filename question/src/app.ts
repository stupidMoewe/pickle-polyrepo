import { errorHandler } from "@stupidpickle/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { NotFoundError } from "./errors";
import {
	answerById,
	answers,
	answersByQuestionId,
	createQuestion,
	questionAnswered,
	questionById,
	questionByIdFormated,
	questionLiked,
	questions,
	questionsByUser,
	uploadImage,
} from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: false,
	})
);

app.use(function (_req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static("uploads"));
app.use(questionsByUser);
app.use(questions);
app.use(createQuestion);
app.use(questionById);
app.use(questionByIdFormated);
app.use(questionLiked);
app.use(answers);
app.use(answerById);
app.use(questionAnswered);
app.use(answersByQuestionId);
app.use(uploadImage);

app.use("*", (_req, _res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
