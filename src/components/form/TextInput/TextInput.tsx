import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";
import React from "react";
export const TextInput = ({
  label = "",
  placeholder = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  width = "100%",
  onChange,
}: TextInputProps) => {
  return (
    <div>
      {label && <p className={styles.label}>{label}</p>}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={
          {
            width: width,
            fontSize: fontSize,
            "--color-outFocus": color,
          } as React.CSSProperties
        }
        type="text"
      />
    </div>
  );
};
