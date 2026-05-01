import { useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import styles from "./AutoComplete.module.scss"
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
  const [filtered, setFiltered] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (val: string) => {
    onChange(val);

    const result = options.filter((o) =>
      o.toLowerCase().includes(val.toLowerCase()),
    );

    setFiltered(result);
    setOpen(true);
  };

  const handleFocus = () => {
  setFiltered(options); 
  setOpen(true);
};

  return (
    <div className={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        isError={isError}
        IsActiveStyle
        errorMessage={errorMessage}
        onFocus={handleFocus} 
        onBlur={() => {
          setTimeout(() => setOpen(false), 100);
          onBlur?.();
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
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={styles.item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
