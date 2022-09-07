import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { timelineApi } from "../features/feed/userFeedApi";
import userQuestionsPreviewReducer from "../features/profile/userQuestionsPreviewSlice";
import answerReducer from "../features/question/answerSlice";
import questionToogleLikeReducer from "../features/question/likeSlice";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		userQuestionsPreview: userQuestionsPreviewReducer,
		questionToogleLike: questionToogleLikeReducer,
		auth: authReducer,
		answer: answerReducer,
		[timelineApi.reducerPath]: timelineApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(timelineApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
