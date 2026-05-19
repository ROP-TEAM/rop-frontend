type TimeValue = {
  hours: string;
  minutes: string;
};

type TimeInputProps = {
  value: TimeValue;
  onChange?: (val: TimeValue) => void;
   onBlur?: (val: TimeValue) => void; 
  placeholder?: string;
  width?: string;
};