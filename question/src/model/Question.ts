import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
	questionType: QuestionTypeOptions;
	title: string;
	answer1: string;
	answer2: string;
	answer3?: string;
	answer4?: string;
	creatorId: string;
	likes: number;
	expirationDate: number;
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
	answer1: string;
	answer2: string;
	answer3?: string;
	answer4?: string;
	creatorId: string;
	likes: number;
	expirationDate: number;
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
		answer1: {
			type: String,
			required: true,
		},
		answer2: {
			type: String,
			required: true,
		},
		answer3: {
			type: String,
			required: false,
			default: "",
		},
		answer4: {
			type: String,
			required: false,
			default: "",
		},
		creatorId: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		expirationDate: {
			type: Number,
			required: true,
			default: new Date().getSeconds() + 60 * 60 * 24, // 1 day
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
