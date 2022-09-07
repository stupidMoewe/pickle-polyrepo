import { AnswerChoozenEvent, Publisher, Subjects } from "@stupidpickle/common";

export class QuestionAnsweredPublisher extends Publisher<AnswerChoozenEvent> {
	subject: Subjects.QuestionAnswerChoozen = Subjects.QuestionAnswerChoozen;
}
