import { baseApi } from "@/app/api/baseApi";
import { getSession } from "next-auth/react";

interface Test {
  email: string;
  user_id: number;
}

export const testApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    TestApi: builder.query<Test, void>({
      query: () => ({ url: "api/test" }),
    }),
  }),
});

export const { useLazyTestApiQuery } = testApi;
