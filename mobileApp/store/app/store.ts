import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userFeedReducer from "../features/feed/userFeedSlice";
import userQuestionsPreviewReducer from "../features/profile/userQuestionsPreviewSlice";
import questionToogleLikeReducer from "../features/question/likeSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
	reducer: {
		userFeed: userFeedReducer,
		userQuestionsPreview: userQuestionsPreviewReducer,
		questionToogleLike: questionToogleLikeReducer,
		auth: authReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
