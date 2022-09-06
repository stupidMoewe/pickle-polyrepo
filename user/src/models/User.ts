import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
	firstname: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	questions: string[];
	likesCount: number;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
	id: string;
	firstname: string;
	lastName: string;
	username: string;
	email: string;
	questions: string[];
	likesCount: number;
}

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		questions: [
			{
				type: String,
				default: [],
			},
		],
		likesCount: {
			type: Number,
			default: 0,
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

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
