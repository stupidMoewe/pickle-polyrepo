import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { TOOGLE_LIKE } from "../actions";
import { questionServiceBaseUrl } from "../baseUrl";

export const toogleLikeAsync = createAsyncThunk(TOOGLE_LIKE, async ({ questionId, like }: any) => {
	// whether to like or unlike
	if (like == true) {
		const response = await axios.post(`${questionServiceBaseUrl}/like/${questionId}`);
		return response.data;
	}else{
		const response = await axios.post(`${questionServiceBaseUrl}/unlike/${questionId}`);
		return response.data;
	}
});

export const toogleLikeSlice = createSlice({
	name: "toogleLike",
	initialState: {
		questionLiked: false,
		loading: false,
		error: {} as SerializedError,
	},
	reducers: {
		toogleLike: (state) => {
			state.questionLiked = state.questionLiked ? false : true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(toogleLikeAsync.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(toogleLikeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.questionLiked = action.payload;
			})
			.addCase(toogleLikeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});
export const { toogleLike } = toogleLikeSlice.actions;

export const isLiked = (state: RootState) => state.questionToogleLike.questionLiked;

export default toogleLikeSlice.reducer;
