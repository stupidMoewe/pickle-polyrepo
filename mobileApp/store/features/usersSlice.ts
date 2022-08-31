import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async (dispatch, getState) => {
	return await fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
});

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		loading: false,
		error: {} as SerializedError,
	},
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			});
	},
});

export default usersSlice.reducer;
