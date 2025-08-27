import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/api/orders?page=${page}&limit=${limit}`,
        credentials: "include",
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
        credentials: "include",
      }),
    }),
    markOrderAsPaid: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useMarkOrderAsPaidMutation,
} = ordersApiSlice;