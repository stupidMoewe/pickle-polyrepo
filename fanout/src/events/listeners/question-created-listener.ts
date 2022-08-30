import { Listener, QuestionCreatedEvent, Subjects } from "@stupidpickle/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { connectRedis } from "./../../redisClient";

export class QuestionCreatedListener extends Listener<QuestionCreatedEvent> {
	subject: Subjects.QuestionCreated = Subjects.QuestionCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: QuestionCreatedEvent["data"], msg: Message) {
		console.log("Feed Question Created Event Received");
		try {
			const redisClient = await connectRedis();
			const questionId = data.id;
			const usersId = await redisClient.keys("*");
			for (const userId of usersId) {
				await redisClient.lPush(userId, questionId);
			}
		} catch (err) {
			console.log(err);
		}

		msg.ack();
	}
}
