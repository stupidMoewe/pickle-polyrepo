import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_USER_QUESTIONS_PREWIEW } from "../actions";
import { questionServiceBaseUrl } from "../baseUrl";

export const getUserQuestionsPreview = createAsyncThunk(
	GET_USER_QUESTIONS_PREWIEW,
	async (userId: string) => {
		const response = await axios.get(`${questionServiceBaseUrl}/questions/user/${userId}`);
		return response.data;
	}
);

const userQuestionsPreviewSlice = createSlice({
	name: "userQuestionsPreview",
	initialState: {
		userQuestionsPreview: [],
		loading: false,
		error: {} as SerializedError,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserQuestionsPreview.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUserQuestionsPreview.fulfilled, (state, action) => {
				state.loading = false;
				state.userQuestionsPreview = action.payload;
			})
			.addCase(getUserQuestionsPreview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default userQuestionsPreviewSlice.reducer;
