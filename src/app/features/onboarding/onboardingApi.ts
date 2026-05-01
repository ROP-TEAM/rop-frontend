import { baseApi } from "@/app/api/baseApi";
import {
  GetOtpPayload,
  GetOtpResponse,
  OnboardingPayload,
  OnboardingResponse,
  OtpValidatePayload,
  OtpValidationResponse,
} from "./types";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitOnboarding: builder.mutation<OnboardingResponse, OnboardingPayload>({
      query: (body) => ({
        url: "/api/onboarding",
        method: "POST",
        body,
      }),
    }),
    getOtp: builder.mutation<GetOtpResponse, GetOtpPayload>({
      query: (body) => ({
        url: "/api/auth/otp",
        method: "POST",
        body,
      }),
    }),
    otpValidation: builder.mutation<OtpValidationResponse, OtpValidatePayload>({
      query: (body) => ({
        url: "/temp", //เดิ๋ยวมาเพิ่มตอน Backend คิดชื่อ api
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSubmitOnboardingMutation,
  useOtpValidationMutation,
  useGetOtpMutation,
} = onboardingApi;
