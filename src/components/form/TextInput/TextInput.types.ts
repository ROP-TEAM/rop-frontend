export interface TextInputProps {
  fontWeight?: string;
  label?: string;
  labelColor?: string;
  labelGap?: string;
  labelSize?: string;
  placeholder?: string;
  value: string;
  fontSize?: string;
  color?: string;
  width?: string;
  border?: string;
  backgroundColor?: string;
  pading?: string;
  require?: boolean;
  onChange: (value: string) => void;
  errorMessage?: string;
}
