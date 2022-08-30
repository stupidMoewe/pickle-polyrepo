import { Publisher, Subjects, UserCreatedEvent } from "@stupidpickle/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
	subject: Subjects.UserCreated = Subjects.UserCreated;
}
