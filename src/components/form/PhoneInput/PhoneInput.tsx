import { useState, useRef, useEffect } from "react";
import styles from "@/components/form/TextInput/TextInput.module.scss";
import { PhoneInputProps } from "./types";


export const PhoneInput = ({ value, onChange}: PhoneInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const format = (raw: string) => {
        const padded = raw.padEnd(10, "_");
        return `${padded.slice(0, 3)}-${padded.slice(3, 6)}-${padded.slice(6, 10)}`;
    };

    const getCursorPos = (raw: string) => {
        if (raw.length <= 3) return raw.length;
        if (raw.length <= 6) return raw.length + 1;
        return raw.length + 2;
    };

    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        const pos = getCursorPos(value);
        el.setSelectionRange(pos, pos);
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            onChange(value.slice(0, -1));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
        onChange(raw);
    };

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                className={`
                    ${styles.input}
                    ${styles.active}
                    ${value.length > 0 ? styles.hasValue : ""}
                    ${value.length === 10 ? styles.success : ""}
                `}
                value={isFocused || value.length > 0 ? format(value) : ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="___-___-____"
                type="text"
            />
        </div>
    );
};