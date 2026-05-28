import { baseApi } from "@/app/api/baseApi";
import { OptimizeReqPayload, OptimizeResPayload } from "./optimize.types";

type ApiResponse<T> = {
  data: T;
};

export const optimizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOptimize: builder.mutation<OptimizeResPayload, OptimizeReqPayload>({
      query: (body) => ({
        url: "/api/optimize",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<OptimizeResPayload>) =>
        response.data,
    }),
  }),
});

export const { useCreateOptimizeMutation } = optimizeApi;
