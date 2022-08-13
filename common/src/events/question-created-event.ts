import { Subjects } from "./subjects";

export interface QuestionCreatedEvent {
	subject: Subjects.QuestionCreated;
	data: {
		id: string;
		title: string;
		answer1: string;
		answer2: string;
		creatorId: string;
	};
}
