import { configureStore } from "@reduxjs/toolkit";
import { likeQuestionSlice } from "../features/likeApiSlice";
import likeSlice from "../features/likeSlice";
import { timelineSlice } from "../features/timelineApiSlice";

export const store = configureStore({
	reducer: {
		[likeQuestionSlice.reducerPath]: likeQuestionSlice.reducer,
		[timelineSlice.reducerPath]: timelineSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(timelineSlice.middleware);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
