import { Publisher, Subjects, QuestionLikedEvent } from "@stupidpickle/common";

export class QuestionLikedPublisher extends Publisher<QuestionLikedEvent> {
	subject: Subjects.QuestionLiked = Subjects.QuestionLiked;
}
