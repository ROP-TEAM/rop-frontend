interface OtpInputProps {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (otp: string) => void;
    placeholder?: string; 
}