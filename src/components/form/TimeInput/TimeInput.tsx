import { useEffect, useRef, useState } from "react";
import styles from "./TimeInput.module.scss";

const TimeInput = ({
  value = { hours: "", minutes: "" },
  onChange,
  onBlur,
  placeholder = "- -",
  width = "100%",
}: TimeInputProps) => {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  const [localTime, setLocalTime] = useState(value);

  useEffect(() => {
    setLocalTime(value);
  }, [value]);

  const hours = localTime?.hours ?? "";
  const minutes = localTime?.minutes ?? "";

  const format = (num: string, max: number): string => {
    let n = parseInt(num || "0", 10);

    if (isNaN(n) || n > max) n = 0;

    return String(n).padStart(2, "0");
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (val.length === 0) {
      setLocalTime({ hours: "", minutes });
      return;
    }

    if (val.length === 1) {
      const num = parseInt(val, 10);

      if (num > 2) {
        const hh = format(val, 23);

        setLocalTime({ hours: hh, minutes });

        minuteRef.current?.focus();

        return;
      }

      setLocalTime({ hours: val, minutes });

      return;
    }

    if (val.length === 2) {
      const hh = format(val, 23);

      setLocalTime({ hours: hh, minutes });

      minuteRef.current?.focus();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (val.length === 0) {
      setLocalTime({ hours, minutes: "" });

      return;
    }

    if (val.length === 1) {
      const num = parseInt(val, 10);

      if (num > 5) {
        const mm = format(val, 59);

        setLocalTime({ hours, minutes: mm });

        return;
      }

      setLocalTime({ hours, minutes: val });

      return;
    }

    if (val.length === 2) {
      const mm = format(val, 59);

      setLocalTime({ hours, minutes: mm });
    }
  };

  const handleBlur = () => {
    onChange?.(localTime);
    onBlur?.(localTime);
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
    <div className={styles.container} style={{ width }}>
      <input
        ref={hourRef}
        value={hours}
        onChange={handleHourChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "hour")}
        onFocus={handleFocus}
      />

      :

      <input
        ref={minuteRef}
        value={minutes}
        onChange={handleMinuteChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "minute")}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default TimeInput;