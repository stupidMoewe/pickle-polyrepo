import { Publisher, Subjects, QuestionCreatedEvent } from "@stupidpickle/common";

export class QuestionCreatedPublisher extends Publisher<QuestionCreatedEvent> {
	subject: Subjects.QuestionCreated = Subjects.QuestionCreated;
}
