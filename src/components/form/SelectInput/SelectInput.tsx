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
export const SelectInput = ({
  value,
  options,
  label,
  isOnTop = 0.8,
  placeholder,
  errorMessage,
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
    setFocusIndex(-1);
  }, [internalActive]);
  return (
    <div>
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
            onClick={() => setInternalActive((prev) => !prev)}
            type="button"
          >
            {value ? (
              <p className={styles.value}>
                {value.substring(0, subString) + "..."}
              </p>
            ) : (
              <p className={styles.placeholder}>{placeholder}</p>
            )}
            <IconSvgMono
              src="/icon/arrow-2-side.svg"
              color={value ? "var(--s-700)" : "var(--p-500)"}
              size={18}
            ></IconSvgMono>
          </button>
        }
      >
        {options.map((item, index) => {
          let selectLabel = "";
          if (typeof item === "string") {
            selectLabel = item.substring(0, subString) + "...";
          } else {
            selectLabel = item.label;
          }
          return (
            <FloatingCard.body
              isHasCheck={checkList.includes(index)}
              onClick={() =>
                onChange(typeof item === "string" ? item : item.value)
              }
              optionRef={(el: HTMLButtonElement | null) => {
                optionRef.current[index] = el;
              }}
              onKeyDown={focusIndex === index ? onFocusOption : undefined}
              key={index}
            >
              {selectLabel}
            </FloatingCard.body>
          );
        })}
      </FloatingCard>
      {/* <div className={styles.trigger}>Hello Select</div> */}
    </div>
  );
};
