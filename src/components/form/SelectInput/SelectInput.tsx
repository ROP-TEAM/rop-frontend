import { useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import styles from "./SelectInput.module.scss";
import Image from "next/image";
import { SelectInputProps} from "./type";
import { Option } from "../AutoComplete/types";

export const SelectInput = ({
  value,
  onChange,
  options,
  label,
  placeholder = "",
  isError,
  errorMessage,
  onBlur,
}: SelectInputProps) => {
  const [open, setOpen] = useState(false);

  const getLabel = (o: Option) => (typeof o === "string" ? o : o.label);
  const getValue = (o: Option) => (typeof o === "string" ? o : o.value);

  const displayValue = (() => {
    const found = options.find((o) => getValue(o) === value);
    return found ? getLabel(found) : "";
  })();

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <TextInput
          label={label}
          value={displayValue}
          onChange={() => {}}  
          placeholder={placeholder}
          isError={isError}
          IsActiveStyle
          errorMessage={errorMessage}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setTimeout(() => {
              setOpen(false);
              onBlur?.();
            }, 150);
          }}
          noText
        />
        <Image
          src="/icon/dropdown.svg"
          alt="dropdown"
          width={25}
          height={25}
          className={styles.icon}
        />
        {open && (
          <div className={styles.dropdown}>
            {options.map((item) => (
              <div
                key={getValue(item)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(getValue(item));
                  setOpen(false);
                }}
                className={`${styles.item} ${getValue(item) === value ? styles.selected : ""}`}
              >
                {getLabel(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};