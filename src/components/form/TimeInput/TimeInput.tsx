import { useRef } from "react";
import styles from "./TimeInput.module.scss";

const TimeInput = ({
  value = { hours: "", minutes: "" },
  onChange,
  placeholder = "- -",
  width = "100%",
}: TimeInputProps) => {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const hours = value?.hours ?? "";
  const minutes = value?.minutes ?? "";

  const format = (num: string, max: number): string => {
    let n = parseInt(num || "0", 10);
    if (isNaN(n) || n > max) n = 0;
    return String(n).padStart(2, "0");
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (val.length === 0) {
      onChange?.({ hours: "", minutes });
      return;
    }

    if (val.length === 1) {
      const num = parseInt(val, 10);

      if (num > 2) {
        const hh = format(val, 23);
        onChange?.({ hours: hh, minutes });
        minuteRef.current?.focus();
        return;
      }

      onChange?.({ hours: val, minutes });
      return;
    }

    if (val.length === 2) {
      const hh = format(val, 23);
      onChange?.({ hours: hh, minutes });
      minuteRef.current?.focus();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val.length === 0) {
      onChange?.({ hours, minutes: "" });
      return;
    }
    if (val.length === 1) {
      const num = parseInt(val, 10);

      if (num > 5) {
        const mm = format(val, 59);
        onChange?.({ hours, minutes: mm });
        return;
      }

      onChange?.({ hours, minutes: val });
      return;
    }

    if (val.length === 2) {
      const mm = format(val, 59);
      onChange?.({ hours, minutes: mm });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute",
  ) => {
    const input = e.currentTarget;

    if (e.key === "Backspace" && !input.value) {
      if (field === "minute") {
        hourRef.current?.focus();
      }
    }

    if (e.key === "ArrowLeft" && field === "minute") {
    e.preventDefault();
    hourRef.current?.focus();
  }

      if (e.key === "ArrowRight" && field === "hour") {
    e.preventDefault();
    minuteRef.current?.focus();
  }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={styles.container}  style={{width}}>
      <input
        ref={hourRef}
        value={hours}
        onChange={(e) => handleHourChange(e)} 
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "hour")}
        onFocus={handleFocus}
      />
      :
      <input
        ref={minuteRef}
        value={minutes}
        onChange={(e) => handleMinuteChange(e)} 
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "minute")}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default TimeInput;
