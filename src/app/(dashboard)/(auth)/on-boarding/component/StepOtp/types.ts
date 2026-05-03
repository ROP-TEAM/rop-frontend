export interface OtpProps {
  phone: string;
  onBack: () => void;
  timeLeft: number;
  setTimeLeft: (t: number | ((prev: number) => number)) => void;
  canResend: boolean;
  setCanResend: (v: boolean) => void;
};