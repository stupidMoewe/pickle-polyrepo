import { errorHandler } from "@stupidpickle/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { NotFoundError } from "./errors";
import { login, logout, me, register, users } from "./routes";

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

app.use(register);
app.use(users);
app.use(me);
app.use(login);
app.use(logout);

app.use("*", (_req, _res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
