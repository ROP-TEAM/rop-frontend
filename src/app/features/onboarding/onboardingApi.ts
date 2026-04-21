import { baseApi } from "@/app/api/baseApi";
import {
  OnboardingPayload,
  OnboardingResponse,
  OtpValidationResponse,
} from "./types";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitOnboarding: builder.mutation<OnboardingResponse, OnboardingPayload>({
      query: (body) => ({
        url: "/onboarding",
        method: "POST",
        body,
      }),
    }),
    otpValidation: builder.mutation<OtpValidationResponse, string>({
      query: (body) => ({
        url: "/temp", //เดิ๋ยวมาเพิ่มตอน Backend คิดชื่อ api
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitOnboardingMutation, useOtpValidationMutation } =
  onboardingApi;
