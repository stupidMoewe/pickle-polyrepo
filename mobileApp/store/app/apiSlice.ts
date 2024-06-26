import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "" }),
	tagTypes: ["Question", "Timeline", "Answer", "User", "UNAUTHORIZED", "UNKNOWN_ERROR"],
	endpoints: (builder) => ({}),
});
