import { apiSlice } from "./apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => `/api/courses?page=${page}&limit=${limit}`,
    }),
    getCourseById: builder.query({
      query: (id) => `/api/courses/${id}`,
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/api/admin/courses",
        method: "POST",
        body: course,
        credentials: "include",
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...course }) => ({
        url: `/api/admin/courses/${id}`,
        method: "PATCH",
        body: course,
        credentials: "include",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/api/admin/courses/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    placeOrder: builder.mutation({
      query: ({ courseId, paymentMethod, email }) => ({
        url: `/api/courses/${courseId}/place`,
        method: "POST",
        body: { paymentMethod, email },
        credentials: "include",
      }),
    }),
    getCoupons: builder.query({
      query: ({ page = 1, limit = 10, used = "false" }: { page?: number; limit?: number; used?: string } = {}) => ({
        url: `/api/admin/coupons?page=${page}&limit=${limit}&used=${used}`,
        credentials: "include",
      }),
    }),
    createCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/api/admin/coupon/create",
        method: "POST",
        body: coupon,
        credentials: "include",
      }),
    }),
    redeemCoupon: builder.mutation({
      query: (code) => ({
        url: "/api/courses/order/redeem",
        method: "POST",
        body: { code },
        credentials: "include",
      }),
    }),
    getCourseVideos: builder.query({
      query: (id) => ({
        url: `/api/courses/${id}/watch`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0, // Don't cache video URLs for security
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  usePlaceOrderMutation,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useRedeemCouponMutation,
  useGetCourseVideosQuery,
} = coursesApiSlice;
