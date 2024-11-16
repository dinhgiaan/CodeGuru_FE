import { apiSlice } from "../api/apiSlice";

export const orderAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStripePublishableKey: builder.query({
            query: () => ({
                url: `payment/stripepublishablekey`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: "payment",
                method: "POST",
                body: { amount },
                credentials: "include" as const
            })
        }),
        createOrder: builder.mutation({
            query: ({ courseId, payment_info }) => ({
                url: "create-order",
                body: {
                    courseId,
                    payment_info
                },
                method: "POST",
                credentials: "include" as const,
            })
        })
    })
});

export const { useGetStripePublishableKeyQuery, useCreatePaymentIntentMutation, useCreateOrderMutation } = orderAPI;