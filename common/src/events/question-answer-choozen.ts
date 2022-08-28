import { Subjects } from "./subjects";

export interface AnswerChoozenEvent {
	subject: Subjects.QuestionAnswerChoozen;
	data: {
		questionId: string;
		answerId: string;
		userId: string;
	};
}
