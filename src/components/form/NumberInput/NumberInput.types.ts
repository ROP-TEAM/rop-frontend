export interface NumberInputProps {
  labelColor?: string;
  labelSize?: string;
  label?: string;
  labelGap?: string;
  placeholder?: string;
  value: number;
  fontSize?: string;
  color?: string;
  width?: string;
  onChange: (value: number) => void;
}
