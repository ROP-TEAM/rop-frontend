type AutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];

  label?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
};