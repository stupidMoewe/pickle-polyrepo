import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Answer
interface AnswerAttrs {
	content: string;
	creatorId: string;
	answerType: "Text" | "Image" | "Video";
}

// An interface that describes the properties
// that a Answer Model has
interface AnswerModel extends mongoose.Model<AnswerDoc> {
	build(attrs: AnswerAttrs): AnswerDoc;
}

export type AnswerTypeOptions = "Text" | "Image" | "Video";

// An interface that describes the properties
// that a Answer Document has
interface AnswerDoc extends mongoose.Document {
	id: string;
	content: string;
	creatorId: string;
	answeredCount: number;
	choozenByUser: string[];
}

const AnswerSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		answerType: {
			type: String,
			required: true,
		},
		creatorId: {
			type: String,
			required: true,
		},
		answeredCount: {
			type: Number,
			required: true,
			default: 0,
		},
		choozenByUser: [
			{
				type: String,
				required: true,
				default: [],
			},
		],
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

AnswerSchema.statics.build = (attrs: AnswerAttrs) => {
	return new Answer(attrs);
};

const Answer = mongoose.model<AnswerDoc, AnswerModel>("Answer", AnswerSchema);

export { Answer };
