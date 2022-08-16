import { Subjects } from "./subjects";

declare enum IQuestionType {
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
		questionType: IQuestionType;
		creatorId: string;
		expirationDate: number;
	};
}
