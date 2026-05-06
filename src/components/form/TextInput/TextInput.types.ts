export interface TextInputProps {
  fontWeight?: string;
  label?: string;
  labelColor?: string;
  labelSize?: string;
  placeholder?: string;
  value: string;
  fontSize?: string;
  color?: string;
  width?: string;
  onChange: (value: string) => void;
}
