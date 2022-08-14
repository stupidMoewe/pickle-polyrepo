require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

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
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI must be defined");
	}
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
	}
	// if (!process.env.JWT_KEY) {
	// 	throw new Error("JWT_KEY must be defined");
	// }

	try {
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

		// new OrderCreatedListener(natsWrapper.client).listen();
		// new OrderCancelledListener(natsWrapper.client).listen();

		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDb");
	} catch (err) {
		console.error(err);
	}

	const port = process.env.PORT || 4002;

	app.listen(port, () => {
		console.log(`Listening on port ${port} !`);
	});
};

start();
