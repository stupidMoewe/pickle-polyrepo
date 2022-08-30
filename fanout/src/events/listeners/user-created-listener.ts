import { Listener, UserCreatedEvent, Subjects } from "@stupidpickle/common";
import { Message } from "node-nats-streaming";
import { connectRedis } from "../../redisClient";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
	subject: Subjects.UserCreated = Subjects.UserCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: UserCreatedEvent["data"], msg: Message) {
		try {
			const userId = data.id;
			const redisClient = await connectRedis();
			await redisClient.rPush(userId, "first");
		} catch (err) {
			console.log(err);
		}

		msg.ack();
	}
}
