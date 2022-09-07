import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN, LOGOUT } from "../actions";
import { userServiceBaseUrl } from "../baseUrl";
import { IAuth } from "../../../types";

export const login = createAsyncThunk(LOGIN, async ({ email, password }: any) => {
	const response = await axios.post(`${userServiceBaseUrl}/login`, {
		email,
		password,
	});
	return response.data;
});

export const logout = createAsyncThunk(LOGOUT, async () => {
	const response = await axios.post(`${userServiceBaseUrl}/logout`);
	return response.data;
});

interface IInitialState {
	user: null | IAuth;
	loading: boolean;
	error: SerializedError;
}

const initialState: IInitialState = {
	user: null,
	loading: false,
	error: {},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;	``
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default authSlice.reducer;
