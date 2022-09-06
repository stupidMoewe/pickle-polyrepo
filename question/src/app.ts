import { errorHandler } from "@stupidpickle/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { NotFoundError } from "./errors";
import {
	answerById,
	answers,
	createQuestion,
	questionById,
	questionLiked,
	questions,
	questionsByUser,
	questionUnliked,
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

app.use(questionsByUser);
app.use(questions);
app.use(createQuestion);
app.use(questionById);
app.use(questionLiked);
app.use(questionUnliked);
app.use(answers);
app.use(answerById);

app.use("*", (_req, _res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
