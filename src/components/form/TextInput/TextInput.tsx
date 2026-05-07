import { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";
import React from "react";
export const TextInput = ({
  label = "",
  labelSize = "1rem",
  labelColor = "var(--p-800)",
  placeholder = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  fontWeight = "400",
  width = "100%",
  border = "none",
  labelGap = "0",
  backgroundColor = "var(--p-0)",
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
            padding: border ? "0.25rem 0.5rem" : "0",
            backgroundColor: backgroundColor,
            width: width,
            fontSize: fontSize,
            fontWeight: fontWeight,
            "--outline-input": border,
            "--color-outFocus": color,
          } as React.CSSProperties
        }
        type="text"
      />
    </div>
  );
};
