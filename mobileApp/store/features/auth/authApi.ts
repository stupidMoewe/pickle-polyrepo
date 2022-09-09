import { IUser } from "../../../types";
import { apiSlice } from "../../app/apiSlice";
import { userServiceBaseUrl } from "../baseUrl";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<IUser, void>({
			query: () => `${userServiceBaseUrl}/me`,
			providesTags: ["User"],
		}),
		login: builder.mutation<object, object>({
			query: (body) => ({
				url: `${userServiceBaseUrl}/login`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		register: builder.mutation<object, object>({
			query: (body) => ({
				url: `${userServiceBaseUrl}/register`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: `${userServiceBaseUrl}/logout`,
				method: "POST",
			}),
			invalidatesTags: ["User"],
		}),
	}),
	overrideExisting: true,
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
