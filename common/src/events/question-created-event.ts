import { Subjects } from "./subjects";

enum questionType {
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
		title: string; // whether the text of the title or the url of the image or the video
		answer1: string;
		answer2: string;
		answer3?: string;
		answer4?: string;
		creatorId: string;
	};
}
