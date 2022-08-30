import { createClient } from "redis";

export const connectRedis = async () => {
	const client = createClient({
		url: process.env.REDIS_URL,
	});
	client.connect();
	client.on("error", (err) => console.log("Redis Client Error", err));
	client.on("connect", () => console.log("Redis Client Connected"));

	return client;
};
