import { Subjects } from "./subjects";

declare enum questionType {
	TextText,
	TextImage,
	ImageText,
	ImageImage,
	VideoText,
	VideoImage,
}
export interface QuestionCreatedEvent {
	subject: Subjects.QuestionCreated;
	data: {
		id: string;
		questionType: questionType;
		creatorId: string;
		expirationDate: number;
	};
}
