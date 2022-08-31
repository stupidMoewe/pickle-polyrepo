import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";

export const getUserTimeline = createAsyncThunk(
	"question/getUserTimeline",
	async (userId, thunkAPI) => {
		console.log("here");
		return await fetch("http://192.168.1.36:4004/" + "630c97a4174daa014ef56df3").then((res) => {
			console.log(res);
			return res.json();
		});
	}
);

const timelineSlice = createSlice({
	name: "questions",
	initialState: {
		questions: [],
		loading: false,
		error: {} as SerializedError,
	},
	reducers: {
		// setQuestions: (state, action) => {
		// 	state.questions = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserTimeline.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUserTimeline.fulfilled, (state, action) => {
				state.loading = false;
				console.log(action.payload);
				state.questions = action.payload;
			})
			.addCase(getUserTimeline.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default timelineSlice.reducer;
