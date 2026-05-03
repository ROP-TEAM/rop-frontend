import { Option } from "../AutoComplete/types";

export interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
}