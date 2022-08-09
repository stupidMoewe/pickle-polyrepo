require("dotenv").config();
import { Channel, Connection, default as amqp, default as amqplib } from "amqplib";

const channelConnect = async () => {
	if (!process.env.RABBIT) {
		throw new Error("RABBIT must be defined");
	}
	const connection: Connection = await amqplib.connect(process.env.RABBIT);
	const channel: Channel = await connection.createChannel();
	return channel;
};

const connectRabbit = async () => {
	if (!process.env.RABBIT) {
		throw new Error("RABBIT must be defined");
	}
	const RABBIT = process.env.RABBIT;
	console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);

	const messagingConnection = await amqp.connect(RABBIT); // Connect to the RabbitMQ server.
	console.log("Connected to RabbitMQ.");
	return await messagingConnection.createChannel();
};

export { channelConnect, connectRabbit };
