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

export interface OtpValidationResponse {}

export interface OnboardingResponse {}

export interface OnboardingPayload {
  companyName: string;
  companyType: CompanyType;
  province: string;
  district: string;
  subDistrict: string;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  tel: string;
}
