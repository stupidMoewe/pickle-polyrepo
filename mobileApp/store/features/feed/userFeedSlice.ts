import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_USER_FEED } from "../actions";
import { timelineServiceBaseUrl } from "../baseUrl";

export const getUserFeed = createAsyncThunk(GET_USER_FEED, async () => {
	const response = await axios.get(`${timelineServiceBaseUrl}`);
	return response.data;
});

const userFeedSlice = createSlice({
	name: "userFeed",
	initialState: {
		questions: [],
		loading: false,
		error: {} as SerializedError,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserFeed.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUserFeed.fulfilled, (state, action) => {
				state.loading = false;
				state.questions = action.payload;
			})
			.addCase(getUserFeed.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default userFeedSlice.reducer;
