import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
    credentials: "include", // This ensures cookies are sent with all requests
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["User", "Course", "Order", "Coupon"],
    endpoints: () => ({}),
});