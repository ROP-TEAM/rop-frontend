import { useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import styles from "./AutoComplete.module.scss";
import Image from "next/image";

export const Autocomplete = ({
  value,
  onChange,
  options,
  label,
  placeholder = "",
  isError,
  errorMessage,
  onBlur,
}: AutocompleteProps) => {
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  const getLabel = (o: Option) => (typeof o === "string" ? o : o.label);

  const getValue = (o: Option) => (typeof o === "string" ? o : o.value);

  const handleChange = (val: string) => {
    onChange(val);

    const result = options.filter((o) =>
      getLabel(o).toLowerCase().includes(val.toLowerCase()),
    );
    setFiltered(result);
    setOpen(true);
  };

  const handleFocus = () => {
    const result = options.filter((o) =>
      getLabel(o).toLowerCase().includes(value.toLowerCase()),
    );
    setFiltered(result);
    setOpen(true);
  };

  const displayValue = (() => {
    const found = options.find((o) => getValue(o) === value);
    return found ? getLabel(found) : value;
  })();

  return (
  <div className={styles.container}>
    <div className={styles.inputWrapper}>
      <TextInput
        label={label}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        isError={isError}
        IsActiveStyle
        errorMessage={errorMessage}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
            onBlur?.();
          }, 150);
        }}
      />
      <Image
        src="/icon/dropdown.svg"
        alt="dropdown"
        width={30}
        height={30}
        className={styles.icon}
      />
      {open && filtered.length > 0 && (
        <div className={styles.dropdown}>
          {filtered.map((item) => (
            <div
              key={getValue(item)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(getValue(item));
                setOpen(false);
              }}
              className={styles.item}
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
