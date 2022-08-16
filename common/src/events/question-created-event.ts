import { Subjects } from "./subjects";

export type QuestionTypeOptions =
	| "TextText"
	| "TextImage"
	| "ImageText"
	| "ImageImage"
	| "VideoText"
	| "VideoImage";
	
export interface QuestionCreatedEvent {
	subject: Subjects.QuestionCreated;
	data: {
		id: string;
		questionType: QuestionTypeOptions;
		creatorId: string;
		expirationDate: number;
	};
}
