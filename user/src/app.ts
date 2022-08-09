import { json } from "body-parser";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { __prod__ } from "./constants";
import { NotFoundError } from "./errors";
import { login, logout, me, register, users } from "./routes";

const app = express();
app.use(json());

let RedisStore = require("connect-redis")(session);
if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL must be defined");
}
let redisClient = new Redis(process.env.REDIS_URL.toString());
redisClient.on("connect", () => {
	console.log("Redis client connected");
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

// This makes sure the queue is declared before attempting to consume from it
// channel.assertQueue(queue, {
// 	durable: true,
// });

// const consumer = async () => {
// 	if (!process.env.RABBIT) {
// 		throw new Error("RABBIT must be defined");
// 	}
// 	const connection = await amqp.connect(process.env.RABBIT);
// 	const channel = await connection.createChannel();
// 	const q = "questionChannel";
// 	const queue = "questionQueue";
// 	await channel.assertExchange(q, "fanout", { durable: true });
// 	const response = await channel.assertQueue(queue, { durable: true });
// 	await channel.bindQueue(response.queue, q, "");

// 	console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

// 	channel.consume(
// 		queue,
// 		(msg) => {
// 			console.log("received sth");
// 			if (msg) {
// 				console.log(" [x] Received %s", msg.content.toString());
// 			}
// 		},
// 		{
// 			noAck: true,
// 		}
// 	);
// };

// try {
// 	consumer();
// } catch (err) {
// 	console.log(err);
// }

// const consumeMessage = async () => {
// 	if (!process.env.RABBIT) {
// 		throw new Error("RABBIT must be defined");
// 	}
// 	const q = "question";
// 	const connection = await amqplib.connect(process.env.RABBIT);
// 	const channel = await connection.createChannel();
// 	await channel.assertQueue(q, { durable: true });
// 	await channel.consume(q, async (msg) => {
// 		if (msg) {
// 			const message = JSON.parse(msg.content.toString());
// 			const creatorId = message.creatorId;
// 			const questionId = message.id;
// 			await User.findOneAndUpdate(creatorId, { $push: { questions: questionId } });
// 			channel.ack(msg);
// 		}
// 	});
// };
// consumeMessage();

app.use(register);
app.use(users);
app.use(me);
app.use(login);
app.use(logout);
app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.use("*", (_req, _res, next) => {
	const error = new NotFoundError();
	next(error);
});

export { app };
