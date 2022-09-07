import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { IQuestionFeed } from "../../../types";
import { GET_USER_FEED } from "../actions";
import { timelineServiceBaseUrl } from "../baseUrl";

export const getUserFeed = createAsyncThunk(GET_USER_FEED, async () => {
	console.log("feedSlice.ts: getUserFeed");
	const response = await axios.get(`${timelineServiceBaseUrl}`);
	return response.data;
});

const questionSlice = createSlice({
	name: "questions",
	initialState: {
		questions: [] as Array<IQuestionFeed>,
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
				state.questions.push(action.payload.questions);
			})
			.addCase(getUserFeed.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default questionSlice.reducer;
