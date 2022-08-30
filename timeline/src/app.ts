import { errorHandler, NotFoundError } from "@stupidpickle/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { feedUserId } from "./routes/feedUserId";

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

app.use(feedUserId)

app.use("*", (_req, _res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
