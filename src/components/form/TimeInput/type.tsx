interface TimeInputProps {
  value?: {
    hours: string;
    minutes: string;
  };

  onChange?: (time: {
    hours: string;
    minutes: string;
  }) => void;

  onBlur?: (time: {
    hours: string;
    minutes: string;
  }) => void;

  placeholder?: string;
  width?: string;
}