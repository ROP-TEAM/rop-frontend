import { NumberInputProps } from "./NumberInput.types";
import styles from "./NumberInput.module.scss";
import React, { ChangeEvent } from "react";
export const NumberInput = ({
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
  return (
    <div>
      {label && (
        <h5
          className={styles.label}
          style={
            {
              "--label-size": labelSize,
              "--label-color": labelColor,
            } as React.CSSProperties
          }
        >
          {label}
        </h5>
      )}
      <input
        className={styles.input}
        value={Number(value).toString()}
        onChange={(e) => onChange(Number(e.target.value))}
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
