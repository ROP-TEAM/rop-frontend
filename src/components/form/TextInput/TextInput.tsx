import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";
import React from "react";
export const TextInput = ({
  label = "",
  placeholder = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  fontWeight = "400",
  width = "100%",
  backgroundColor = "var(--p-0)",
  onChange,
}: TextInputProps) => {
  return (
    <div>
      {label && <h5 className={styles.label}>{label}</h5>}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={
          {
            backgroundColor: backgroundColor,
            width: width,
            fontSize: fontSize,
            fontWeight: fontWeight,
            "--color-outFocus": color,
          } as React.CSSProperties
        }
        type="text"
      />
    </div>
  );
};
