import { configureStore } from "@reduxjs/toolkit";
import { likeQuestionSlice } from "../features/likeApiSlice";
import { timelineSlice } from "../features/timelineApiSlice";

const store = configureStore({
	reducer: {
		[likeQuestionSlice.reducerPath]: likeQuestionSlice.reducer,
		[timelineSlice.reducerPath]: timelineSlice.reducer,
		// users: usersReducer,
		// timeline: timelineReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(likeQuestionSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export default store;
