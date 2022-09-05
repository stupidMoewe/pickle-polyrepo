require("dotenv").config();
import { app } from "./app";
import { connectRedis } from "./redisClient";

const start = async () => {
	console.log("Starting...");
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
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
