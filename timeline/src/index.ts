require("dotenv").config();
import { app } from "./app";
import { connectRedis } from "./redisClient";

const start = async () => {
	console.log("Starting...");
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
	}
	// if (!process.env.JWT_KEY) {
	// 	throw new Error("JWT_KEY must be defined");
	// }

	try {
		await connectRedis();
		// console.log(await redisClient.lRange("users1", 0, -1));
		// console.log(await redisClient.lRange("users2", 0, -1))
	} catch (err) {
		console.error(err);
	}

	const port = process.env.PORT || 4004;

	app.listen(port, () => {
		console.log(`Listening on port ${port} !`);
	});
};

start();
