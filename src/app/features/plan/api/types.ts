export interface CreatePlanPayload {
    name: string;
    plan_date: string;
}

export interface CreatePlanResponse {
    created_at: string;
    id: "string";
    name:"string";
}