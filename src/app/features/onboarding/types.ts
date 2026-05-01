export enum CompanyType {
  LOGISTICS = "logistics",
  ECOMMERCE = "ecommerce",
  RETAIL = "retail",
  DISTRIBUTOR = "distributor",
  MANUFACTURER = "manufacturer",
  SERVICE = "service",
  FOOD_DELIVERY = "food_delivery",
  OTHER = "other",
}

export interface GetOtpPayload {
  Tel: string;
}
export interface GetOtpResponse {
  RefNo: string;
}
export interface OtpValidatePayload {
  refNO: String;
  OtpCode: string;
}

export interface OtpValidationResponse {
  message: string;
}

export interface OnboardingResponse {
  message: string;
}

export interface OnboardingPayload {
  companyName: string;
  companyType: CompanyType;
  province: string;
  district: string;
  subDistrict: string;
  address: string;
  alley?: string | null;
  postalCode: string;
}
