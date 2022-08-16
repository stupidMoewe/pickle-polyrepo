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

// let RedisStore = require("connect-redis")(session);
// if (!process.env.REDIS_URL) {
// 	throw new Error("REDIS_URL must be defined");
// }
// let redisClient = new Redis(process.env.REDIS_URL.toString());
// redisClient.on("connect", () => {
// 	console.log("Redis client connected");
// });
// redisClient.on("error", (err) => {
// 	console.log(err);
// });

// app.set("proxy", 1);

// app.use(
// 	session({
// 		name: "qid",
// 		store: new RedisStore({ client: redisClient, disableTouch: true }),
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
// 			httpOnly: true,
// 			sameSite: "lax",
// 			secure: __prod__,
// 		},
// 		saveUninitialized: false,
// 		secret: "hfrdigyouugipgihjk",
// 		resave: false,
// 	})
// );

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
