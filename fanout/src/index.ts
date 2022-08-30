require("dotenv").config();
import { app } from "./app";
import { QuestionCreatedListener } from "./events/listeners/question-created-listener";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { natsWrapper } from "./nats-wrapper";
import { connectRedis } from "./redisClient";

const start = async () => {
	console.log("Starting...");
	if (!process.env.NATS_CLIENT_ID) {
		throw new Error("NATS_CLIENT_ID must be defined");
	}
	if (!process.env.NATS_URL) {
		throw new Error("NATS_URL must be defined");
	}
	if (!process.env.NATS_CLUSTER_ID) {
		throw new Error("NATS_CLUSTER_ID must be defined");
	}
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
	}

	try {
		await connectRedis();

		await natsWrapper.connect(
			process.env.NATS_CLUSTER_ID,
			process.env.NATS_CLIENT_ID,
			process.env.NATS_URL
		);
		natsWrapper.client.on("close", () => {
			console.log("NATS connection closed!");
			process.exit();
		});
		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		new UserCreatedListener(natsWrapper.client).listen();
		new QuestionCreatedListener(natsWrapper.client).listen();
	} catch (err) {
		console.error(err);
	}

	const port = process.env.PORT || 4003;

	app.listen(port, () => {
		console.log(`Listening on port ${port} !`);
	});
};

start();
