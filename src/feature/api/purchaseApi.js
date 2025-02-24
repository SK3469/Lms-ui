import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8000/api/v1/purchase";

export const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PURCHASE_API,
        credentials: "include", // Include cookies
    }),
    endpoints: (builder) => ({
        // Mutation to create a Stripe checkout session
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: "/checkout/create-checkout-session",
                method: "POST",
                body: { courseId },
            }),
        }),

        // Query to fetch course details with purchase status
        getCourseDetailWithPurchaseStatus: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/detail-with-status`,
                method: "GET",
            }),
        }),

        // Query to fetch all purchases
        getPurchase: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
    }),
});

// Export hooks for the endpoints
export const {
    useCreateCheckoutSessionMutation,
    useGetCourseDetailWithPurchaseStatusQuery,
    useGetPurchaseQuery,
} = purchaseApi;
