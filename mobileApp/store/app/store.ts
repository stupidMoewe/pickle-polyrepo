import { configureStore } from "@reduxjs/toolkit";
import { likeQuestionSlice } from "../features/likeApiSlice";
import usersReducer from "../features/usersSlice";
import timelineReducer from "../features/timeline/timelineSlice";
import { timelineSlice } from "../features/timelineApiSlice";

const store = configureStore({
	reducer: {
		[likeQuestionSlice.reducerPath]: likeQuestionSlice.reducer,
		[timelineSlice.reducerPath]: timelineSlice.reducer,
		users: usersReducer,
		// timeline: timelineReducer,
	},
	// middleware: (getDefaultMiddleware) => {
	// 	return getDefaultMiddleware().concat(timelineSlice.middleware);
	// },
});

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export default store;
