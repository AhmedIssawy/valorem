import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../features/constants";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: userData,
                credentials: "include",
            }),
        }),
        getMe: builder.query({
            query: () => ({
                url: `${AUTH_URL}/me`,
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetMeQuery,
} = authApiSlice;
