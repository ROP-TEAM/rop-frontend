type Option = string | { label: string; value: string };
type AutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
   options: Option[];

  label?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
};