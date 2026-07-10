import { baseApi } from "@/app/api/baseApi";
import { CreatePlanPayload, CreatePlanResponse } from "./types";

export const planApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPlan: builder.mutation<CreatePlanResponse, CreatePlanPayload>({
            query: (body) => ({
                url: "/api/plan",
                method: "POST",
                body,    
            }),
        }),
    })
});

export const { useCreatePlanMutation } = planApi;