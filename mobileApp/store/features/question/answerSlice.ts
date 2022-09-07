import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { ANSWER, GET_ANSWER } from "../actions";
import { questionServiceBaseUrl } from "../baseUrl";

export const getAnswer = createAsyncThunk(GET_ANSWER, async (questionId: string) => {});

export const answer = createAsyncThunk(
	ANSWER,
	async ({ questionId, answerId }: { questionId: string; answerId: string }) => {
		const response = await axios.post(
			`${questionServiceBaseUrl}/${questionId}/answer/${answerId}`
		);
		return response.data;
	}
);

interface IInitialState {
	questionsAnswered: string[];
	answersChoozen: string[];
	loading: boolean;
	error: SerializedError;
}

const initialState: IInitialState = {
	questionsAnswered: [],
	answersChoozen: [],
	loading: false,
	error: {},
};

export const answerSlice = createSlice({
	name: "answerQuestion",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(answer.pending, (state) => {
				state.loading = true;
			})
			.addCase(answer.fulfilled, (state, action) => {
				state.loading = false;
				state.questionsAnswered.push(action.payload.questionId);
				state.answersChoozen.push(action.payload.answerId);
			})
			.addCase(answer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
		// .addCase(getAnswer.pending, (state) => {
		// 	state.loading = true;
		// })
		// .addCase(getAnswer.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.answersChoozen = action.payload;
		// })
		// .addCase(getAnswer.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.error;
		// });
	},
});

export default answerSlice.reducer;
