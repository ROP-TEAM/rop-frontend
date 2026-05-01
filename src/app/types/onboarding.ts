export interface OnboardingPayload {
  companyName: string;
  companyType: string;
  province: string;
  district: string;
  subDistrict: string;
  address: string;
  alley: string | null;
  postalCode: string;
}