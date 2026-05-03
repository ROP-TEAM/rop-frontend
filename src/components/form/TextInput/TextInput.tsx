import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";
import React from "react";
export const TextInput = ({
  label = "",
  placeholder = "",
  value,
  color = "var(--p-200)",
  labelFontSize = "1rem",
  fontSize = "0.825rem",
  width = "100%",
  onChange,
  isError = false,
  IsActiveStyle = false,
  errorMessage = "",
  onBlur,
  onFocus,
  readOnly,
}: TextInputProps) => {
  return (
    <div className={styles.container}>
      {label && (
        <h5 className={styles.label} style={{ fontSize: labelFontSize }}>
          {label}
        </h5>
      )}
      <input
        className={`
    ${styles.input}
    ${value ? styles.hasValue : ""}
    ${isError ? styles.error : ""}
    ${IsActiveStyle ? styles.active : ""}
    ${readOnly ? styles.readOnly : ""}
  `}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        style={
          {
            width: width,
            fontSize: fontSize,
            "--color-outFocus": color,
          } as React.CSSProperties
        }
        type="text"
      />
      <p className={styles.errorText}>{isError ? errorMessage : ""}</p>
    </div>
  );
};
