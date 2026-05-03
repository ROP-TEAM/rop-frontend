export interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  labelFontSize?: string; 
  fontSize?: string;
  color?: string;
  width?: string;
  onChange?: (value: string) => void;

  isError?: boolean;
  errorMessage?: string;
  IsActiveStyle?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
  noText?: boolean; 
}
