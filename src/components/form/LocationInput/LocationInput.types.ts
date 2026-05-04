import { Location } from "@/types/api.types";
export interface LocationInputProps {
  labelColor?: string;
  labelSize?: string;
  label?: string;
  labelGap?: string;
  placeholder?: string;
  value: Location;
  fontSize?: string;
  color?: string;
  width?: string;
  onChange: (value: Location) => void;
}
