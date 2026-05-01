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
  isError = false,
  IsActiveStyle = false,
  errorMessage = "",
  onBlur,
  onFocus,
}: TextInputProps) => {
  return (
    <div className={styles.container}>
      {label && <h5 className={styles.label}>{label}</h5>}
      <input
        className={`
    ${styles.input}
    ${value ? styles.hasValue : ""}
    ${isError ? styles.error : ""}
    ${IsActiveStyle ? styles.active : ""}
  `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      {isError && errorMessage && (
        <p className={styles.errorText}>{errorMessage}</p>
      )}
    </div>
  );
};
