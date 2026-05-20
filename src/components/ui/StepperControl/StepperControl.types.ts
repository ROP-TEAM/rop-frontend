export interface StepperProp {
  value: number;
  label: string;
  onClick?: () => void;
}

export interface StepperControlProps {
  fontSize?: string;
  stepper: StepperProp[];
  value?: number;
}
