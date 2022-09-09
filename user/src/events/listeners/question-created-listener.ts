import { Listener, QuestionCreatedEvent, Subjects } from "@stupidpickle/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/User";
import { queueGroupName } from "./queue-group-name";

export class QuestionCreatedListener extends Listener<QuestionCreatedEvent> {
	subject: Subjects.QuestionCreated = Subjects.QuestionCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: QuestionCreatedEvent["data"], msg: Message) {
		console.log("inside on message");
		try {
			const user = await User.findById(data.creatorId);

			if (user) {
				user.questions.push(data.id);
				await user.save();
			}
		} catch (err) {
			console.log(err);
		}

		msg.ack();
	}
}
