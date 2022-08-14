import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
	title: string;
	answer1: string;
	answer2: string;
	creatorId: string;
}

// An interface that describes the properties
// that a Question Model has
interface QuestionModel extends mongoose.Model<QuestionDoc> {
	build(attrs: QuestionAttrs): QuestionDoc;
}

interface QuestionDoc extends mongoose.Document {
	title: string;
	answer1: string;
	answer2: string;
	creatorId: string;
}

const questionSchema = new mongoose.Schema(
	{
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
		creatorId: {
			type: String,
			required: true,
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

const Question = mongoose.model<QuestionDoc, QuestionModel>(
	"Question",
	questionSchema
);

export { Question };
