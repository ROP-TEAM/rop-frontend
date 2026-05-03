export interface PhoneInputProps {
    value: string;
    onChange: (raw: string) => void;
    onBlur?: () => void; 
    isError?: boolean;
    errorMessage?: string;
}

