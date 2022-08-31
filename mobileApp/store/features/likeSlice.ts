import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
	isLikedByCurrentUser: boolean;
}

const initialState: LikeState = {
	isLikedByCurrentUser: false,
};

const likeSlice = createSlice({
	name: "likedQuestion",
	initialState,
	reducers: {
		like: (state, questionId: PayloadAction<number>) => {
			state.isLikedByCurrentUser = true;
		},
		unlike: (state, questionId: PayloadAction<number>) => {
			state.isLikedByCurrentUser = false;
		},
	},
});

export const { like, unlike } = likeSlice.actions;
export default likeSlice.reducer;
