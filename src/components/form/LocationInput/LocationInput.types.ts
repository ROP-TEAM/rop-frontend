import { Location } from "@/types/api.types";
export interface LocationInputProps {
  labelColor?: string;
  labelSize?: string;
  backgroundColor?: string;
  label?: string;
  labelWeight?: string;
  labelGap?: string;
  placeholder?: string;
  value: Location;
  fontSize?: string;
  color?: string;
  isRequire?: boolean;
  width?: string;
  inputId?: string;
  onChange: (value: Location) => void;
}
