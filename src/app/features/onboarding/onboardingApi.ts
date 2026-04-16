import { baseApi } from "@/app/api/baseApi";
import { OnboardingPayload, OnboardingResponse } from "./types";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitOnboarding: builder.mutation<OnboardingResponse, OnboardingPayload>({
      query: (body) => ({
        url: "/onboarding",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitOnboardingMutation } = onboardingApi;
