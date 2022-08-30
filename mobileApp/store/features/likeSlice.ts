import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
	isQuestionLiked: boolean;
}

const initialState: LikeState = {
	isQuestionLiked: false,
};

const likeSlice = createSlice({
	name: "likedQuestion",
	initialState,
	reducers: {
		like: (state, questionId: PayloadAction<number>) => {
			state.isQuestionLiked = true;
		},
		unlike: (state, questionId: PayloadAction<number>) => {
			state.isQuestionLiked = false;
		},
	},
});

export const { like, unlike } = likeSlice.actions;
export default likeSlice.reducer;
