export interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  fontSize?: string;
  width?: string;
  onChange: (value: string) => void;
}
