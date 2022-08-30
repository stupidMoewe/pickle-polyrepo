import { Listener, QuestionLikedEvent, Subjects } from "@stupidpickle/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/User";
import { queueGroupName } from "./queue-group-name";

export class QuestionLikedListener extends Listener<QuestionLikedEvent> {
	subject: Subjects.QuestionLiked = Subjects.QuestionLiked;
	queueGroupName = queueGroupName;

	async onMessage(data: QuestionLikedEvent["data"], msg: Message) {
		try {
			const user = await User.findById(data.creatorId);

			if (user) {
				user.likesCount += 1;
				await user.save();
			}
		} catch (err) {
			console.log(err);
		}

		msg.ack();
	}
}
