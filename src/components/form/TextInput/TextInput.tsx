import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";
import React from "react";
export const TextInput = ({
  label = "",
  labelSize = "1rem",
  labelColor = "var(--p-800)",
  placeholder = "",
  errorMessage = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  fontWeight = "400",
  width = "100%",
  border = "none",
  labelGap = "0",
  backgroundColor = "var(--p-0)",
  pading = "",
  require = false,
  onChange,
}: TextInputProps) => {
  return (
    <div>
      {label && (
        <h5
          style={{
            fontSize: labelSize,
            color: labelColor,
            marginBottom: labelGap,
          }}
          className={styles.label}
        >
          {label}
        </h5>
      )}
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
            padding: pading,
            "--outline-input": border,
            "--color-outFocus": color,
            "--input-padding": border !== "none" ? "0.25rem 0.5rem" : "0",
          } as React.CSSProperties
        }
        type="text"
      />
    </div>
  );
};
