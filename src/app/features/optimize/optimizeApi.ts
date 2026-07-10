import { baseApi } from "@/app/api/baseApi";
import { OptimizeReqPayload, OptimizeResPayload } from "./optimize.types";
import { setOptimizeResult } from "./optimizeSlice";

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setOptimizeResult(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useCreateOptimizeMutation } = optimizeApi;
