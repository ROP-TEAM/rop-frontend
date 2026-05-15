export type Option = string | { label: string; value: string };
export interface SelectInputProps {
  value: string;
  options: Option[];
  label?: string;
  checkList?: number[];
  isOnTop?: boolean | number;
  placeholder?: string;
  errorMessage?: string;
  activeBorder?: string;
  activeBackground?: string;
  activeFontColor?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}
