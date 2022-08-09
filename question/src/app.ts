import { json } from "body-parser";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { __prod__ } from "./constants";
import { NotFoundError } from "./errors";
import { createQuestion, questionById, questions, questionsByUser } from "./routes";

const app = express();
app.use(json());

let RedisStore = require("connect-redis")(session);
let redisClient = new Redis(process.env.REDIS_URL!);
redisClient.on("connect", () => {
	console.log("Redis client connected !");
});
redisClient.on("error", (err) => {
	console.log(err);
});

app.set("proxy", 1);

app.use(
	session({
		name: "qid",
		store: new RedisStore({ client: redisClient, disableTouch: true }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
			httpOnly: true,
			sameSite: "lax",
			secure: __prod__,
		},
		saveUninitialized: false,
		secret: "hfrdigyouugipgihjk",
		resave: false,
	})
);

app.use(questionsByUser);
app.use(questions);
app.use(createQuestion);
app.use(questionById);

app.use("*", (_req, _res, next) => {
	const error = new NotFoundError();
	next(error);
});

export { app };
