export type Option = { label: string; value: string; color?: string };
export interface SelectInputProps {
  value: string;
  options: Option[];
  label?: string;
  labelSize?: string;
  checkList?: number[];
  isOnTop?: boolean | number;
  placeholder?: string;
  errorMessage?: string;
  activeBorder?: string;
  hasBorder?: boolean;
  activeBackground?: string;
  activeFontColor?: string;
  withColorStyle?: boolean;
  subString?: number;
  onChange: (value: string) => void;
}
