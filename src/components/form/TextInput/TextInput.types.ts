export interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  fontSize?: string;
  color?: string;
  width?: string;
  onChange: (value: string) => void;
}
