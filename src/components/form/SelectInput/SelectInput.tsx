import {
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./SelectInput.module.scss";
import { SelectInputProps } from "./SelectInput.types";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { FloatingCard } from "@/components/ui/FloatingCard/FloatingCard";
import { Option as OptionType } from "./SelectInput.types";
export const SelectInput = ({
  value,
  options,
  label,
  isOnTop = 0.8,
  placeholder,
  errorMessage,
  labelSize = "0.725rem",
  withColorStyle = false,
  hasBorder = false,
  checkList = [],
  subString = 99,
  onChange,
}: SelectInputProps) => {
  const [internalActive, setInternalActive] = useState(false);
  const optionRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const onFocusOption = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      const index = (focusIndex + 1) % options.length;

      e.preventDefault();
      setFocusIndex(index);
      optionRef.current[index]?.focus();
    }
    if (e.key === "ArrowUp") {
      let index = (focusIndex - 1) % options.length;

      if (focusIndex < 1) {
        index = options.length - 1;
      }
      e.preventDefault();
      setFocusIndex(index);
      optionRef.current[index]?.focus();
    }
  };

  useEffect(() => {
    if (internalActive) return;
    const timer = setTimeout(() => {
      setFocusIndex(-1);
    }, 0);

    return () => clearTimeout(timer);
  }, [internalActive]);
  return (
    <div>
      {label && <label style={{ fontSize: labelSize }}>{label}</label>}
      <FloatingCard
        bodyHeight="12rem"
        isOnTop={isOnTop}
        isActive={internalActive}
        setIsActive={setInternalActive}
        trigger={
          <button
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "ArrowDown" && focusIndex == -1) {
                e.preventDefault();
                setFocusIndex(0);
                optionRef.current[0]?.focus();
              }
            }}
            className={`${styles.trigger}  ${internalActive ? styles.active : ""} ${value ? styles.hasValue : ""}`}
            onClick={() => setInternalActive(true)}
            type="button"
            style={
              {
                "--border-default": hasBorder ? "var(--border-subtle)" : "",
                "--padding-default": hasBorder
                  ? "0.375rem 0.875rem"
                  : "0.375rem 0.725rem",
              } as React.CSSProperties
            }
          >
            {value ? (
              <h3 className={styles.value}>
                {options.find((item) => item.value === value)?.label}
                {/* {value.substring(0, subString) +
                  (value.length > subString ? "..." : "")} */}
              </h3>
            ) : (
              <p className={styles.placeholder}>{placeholder}</p>
            )}
            <IconSvgMono
              src="/icon/arrow-2-side.svg"
              color={value && withColorStyle ? "var(--s-700)" : "var(--p-500)"}
              size={18}
            ></IconSvgMono>
          </button>
        }
      >
        {options.map((item, index) => {
          return (
            <FloatingCard.body
              isHasCheck={checkList.includes(index)}
              onClick={() => {
                onChange(typeof item === "string" ? item : item.value);
                setInternalActive(false);
              }}
              optionRef={(el: HTMLButtonElement | null) => {
                optionRef.current[index] = el;
              }}
              onKeyDown={focusIndex === index ? onFocusOption : undefined}
              key={index}
            >
              {item.label}
            </FloatingCard.body>
          );
        })}
      </FloatingCard>
      {/* <div className={styles.trigger}>Hello Select</div> */}
    </div>
  );
};
