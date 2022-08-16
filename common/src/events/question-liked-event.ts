import { Subjects } from "./subjects";

export interface QuestionLikedEvent {
	subject: Subjects.QuestionLiked;
	data: {
		questionId: string;
		userId: string;
		creatorId: string;
	};
}
