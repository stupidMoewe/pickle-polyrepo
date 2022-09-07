require("dotenv").config();
import { app } from "./app";
import { connectRedis } from "./redisClient";

const start = async () => {
	console.log("Starting...");
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
	}
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY must be defined");
	}
	if (!process.env.NATS_CLIENT_ID) {
		throw new Error("NATS_CLIENT_ID must be defined");
	}
	if (!process.env.NATS_URL) {
		throw new Error("NATS_URL must be defined");
	}
	if (!process.env.NATS_CLUSTER_ID) {
		throw new Error("NATS_CLUSTER_ID must be defined");
	}

	try {
		await connectRedis();
	} catch (err) {
		console.error(err);
	}

	const port = process.env.PORT || 4004;

	app.listen(port, () => {
		console.log(`Listening on port ${port} !`);
	});
};

start();
