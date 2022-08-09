require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
	if (!process.env.DBHOST) {
		throw new Error("DATABASE_URL must be defined");
	}
	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL must be defined");
	}
	if (!process.env.RABBIT) {
		throw new Error("RABBIT must be defined");
	}

	const DBHOST = process.env.DBHOST;
	const PORT = process.env.PORT;

	// mongo
	try {
		await mongoose.connect(DBHOST);
		console.log("Connected to MongoDb");
	} catch (err) {
		console.error(err);
	}

	// port connection
	const port = PORT || 4001;

	app.listen(port, () => {
		console.log(`Listening on port ${port} !`);
	});
};

start();
