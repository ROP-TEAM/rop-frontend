import { NumberInputProps } from "./NumberInput.types";
import styles from "./NumberInput.module.scss";
import React, { ChangeEvent } from "react";
export const NumberInput = ({
  isFloat = true,
  labelColor = "var(--p-800)",
  labelSize = "1rem",
  label = "",
  labelGap = "0.5rem",
  placeholder = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  width = "100%",
  onChange,
}: NumberInputProps) => {
  const handleNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!isFloat && raw.includes(".")) {
      return;
    }
    onChange(Number(raw));
  };
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className={styles.label}
          style={
            {
              "--label-size": labelSize,
              "--label-color": labelColor,
            } as React.CSSProperties
          }
        >
          {label}
        </label>
      )}
      <input
        id={label}
        min={0}
        className={styles.input}
        value={Number(value).toString()}
        onChange={(e) => handleNumberInput(e)}
        placeholder={placeholder}
        style={
          {
            width: width,
            fontSize: fontSize,
            "--color-outFocus": color,
          } as React.CSSProperties
        }
        type="number"
      />
    </div>
  );
};
