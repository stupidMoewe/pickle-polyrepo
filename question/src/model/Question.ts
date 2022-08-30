import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
	questionType: QuestionTypeOptions;
	title: string;
	possibleAnswers: string[];
	creatorId: string;
	// likedCount: number;
	// commentedCount: number;
	// commentedByUsers: string[];
	// likedByUsers: string[];
	// answeredByUsers: string[];
	expirationDate: number;
	// answersCount: number;
}

// An interface that describes the properties
// that a Question Model has
interface QuestionModel extends mongoose.Model<QuestionDoc> {
	build(attrs: QuestionAttrs): QuestionDoc;
}

export type QuestionTypeOptions =
	| "TextText"
	| "TextImage"
	| "ImageText"
	| "ImageImage"
	| "VideoText"
	| "VideoImage";

// An interface that describes the properties
// that a Question Document has
interface QuestionDoc extends mongoose.Document {
	id: string;
	questionType: QuestionTypeOptions;
	title: string;
	possibleAnswers: string[];
	creatorId: string;
	likedCount: number;
	commentedCount: number;
	commentedByUsers: string[];
	likedByUsers: string[];
	answeredByUsers: string[];
	expirationDate: number;
	answeredCount: number;
}

const questionSchema = new mongoose.Schema(
	{
		questionType: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		possibleAnswers: [
			{
				type: String,
				required: true,
			},
		],
		creatorId: {
			type: String,
			required: true,
		},
		likedCount: {
			type: Number,
			required: true,
			default: 0,
		},
		commentedCount: {
			type: Number,
			required: true,
			default: 0,
		},
		commentedByUsers: [
			{
				type: String,
				default: [],
			},
		],
		likedByUsers: [
			{
				type: String,
				default: [],
			},
		],
		answeredByUsers: [
			{
				type: String,
				default: [],
			},
		],
		expirationDate: {
			type: Number,
			required: true,
			default: new Date().getSeconds() + 60 * 60 * 24, // 1 day
		},
		answeredCount: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

questionSchema.statics.build = (attrs: QuestionAttrs) => {
	return new Question(attrs);
};

const Question = mongoose.model<QuestionDoc, QuestionModel>("Question", questionSchema);

export { Question };
