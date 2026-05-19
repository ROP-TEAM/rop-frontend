import { useEffect, useRef, useState } from "react";
import styles from "./TimeInput.module.scss";

const TimeInput = ({
  value = { hours: "", minutes: "" },
  onChange,
  onBlur,
  placeholder = "- -",
  width = "100%",
}: TimeInputProps) => {
  const [localValue, setLocalValue] = useState<TimeValue>(
    value ?? { hours: "", minutes: "" },
  );
  useEffect(() => {
    setLocalValue(value ?? { hours: "", minutes: "" });
  }, [value.hours, value.minutes]);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  const format = (num: string, max: number): string => {
    let n = parseInt(num || "0", 10);
    if (isNaN(n) || n > max) n = 0;
    return String(n).padStart(2, "0");
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (val.length === 0) {
      setLocalValue((prev) => ({ ...prev, hours: "" }));
      return;
    }

    if (val.length === 1) {
      const num = parseInt(val, 10);
      if (num > 2) {
        const hh = format(val, 23);
        setLocalValue((prev) => ({ ...prev, hours: hh }));
        minuteRef.current?.focus();
        minuteRef.current?.select();
        return;
      }
      setLocalValue((prev) => ({ ...prev, hours: val }));
      return;
    }

    if (val.length === 2) {
      const hh = format(val, 23);
      setLocalValue((prev) => ({ ...prev, hours: hh }));
      minuteRef.current?.focus();
      minuteRef.current?.select();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (val.length === 0) {
      setLocalValue((prev) => ({ ...prev, minutes: "" }));
      return;
    }

    if (val.length === 1) {
      const num = parseInt(val, 10);
      if (num > 5) {
        const mm = format(val, 59);
        setLocalValue((prev) => ({ ...prev, minutes: mm }));
        return;
      }
      setLocalValue((prev) => ({ ...prev, minutes: val }));
      return;
    }

    if (val.length === 2) {
      const mm = format(val, 59);
      setLocalValue((prev) => ({ ...prev, minutes: mm }));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute",
  ) => {
    const input = e.currentTarget;
    if (e.key === "Backspace" && !input.value) {
      if (field === "minute") hourRef.current?.focus();
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
    requestAnimationFrame(() => e.target.select());
  };

  const handleBlur = () => {
    onBlur?.(localValue);
  };

  return (
    <div className={styles.container} style={{ width }} onBlur={handleBlur}>
      <input
        ref={hourRef}
        value={localValue.hours}
        onChange={handleHourChange}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "hour")}
        onFocus={handleFocus}
      />
      :
      <input
        ref={minuteRef}
        value={localValue.minutes}
        onChange={handleMinuteChange}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, "minute")}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default TimeInput;
