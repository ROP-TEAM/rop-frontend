import { baseApi } from "@/app/api/baseApi";

export const optimizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOptimize: builder.mutation({
      query: (body) => ({
        url: "/api/optimize",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOptimizeMutation } = optimizeApi;
