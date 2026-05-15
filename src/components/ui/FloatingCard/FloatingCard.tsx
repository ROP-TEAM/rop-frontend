import { FloatingCardBodyProps, FloatingCardProps } from "./Floating.types";
import styles from "./FloatingCard.module.scss";
import { useClickOutSide } from "@/hook/useClickOutSide";
import React, { useLayoutEffect, useState } from "react";
import IconSvgMono from "@/components/Icon/SvgIcon";

export const FloatingCard = ({
  bodyWidth = "100%",
  trigger,
  children,
  isOnTop = "auto",
  isActive,
  isOnRight = false,
  setIsActive,
}: FloatingCardProps) => {
  const floatRef = useClickOutSide<HTMLDivElement>(() => {
    setIsActive(false);
  });
  const [isOnTopInternal, setIsOnTopInternal] = useState(false);

  useLayoutEffect(() => {
    if (!isActive || !floatRef.current || isOnTop !== "auto") return;
    const therehold = window.innerHeight * 0.8;
    const rect = floatRef.current.getBoundingClientRect();
    setIsOnTopInternal(rect.bottom > therehold);
  }, [isActive]);
  return (
    <div className={styles.warpper} ref={floatRef}>
      <div role="combobox" aria-expanded={isActive} aria-haspopup="listbox">
        {trigger}
      </div>
      {isActive && (
        <div
          role="listbox"
          tabIndex={-1}
          style={
            {
              ...(isOnTopInternal
                ? {
                    "--position-top": "auto",
                    "--position-bottom": "80%",
                  }
                : {
                    "--position-top": "80%",
                    "--position-bottom": "auto",
                  }),
              ...(isOnRight
                ? {
                    "--position-left": "auto",
                    "--position-right": "0",
                  }
                : {
                    "--position-left": "0",
                    "--position-right": "auto",
                  }),
              ...{ "--body-width": bodyWidth },
            } as React.CSSProperties
          }
          className={styles.floating}
        >
          {children}
        </div>
      )}
    </div>
  );
};

FloatingCard.body = ({
  isHasCheck = false,
  isHasLine = false,
  children,
  onClick = () => {},
  onFocus = () => {},
  onKeyDown = () => {},
  optionRef,
}: FloatingCardBodyProps) => {
  return (
    <div role="presentation">
      {isHasLine && <hr role="separator" className={styles.line} />}
      <button
        ref={optionRef}
        role="option"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={() => onClick()}
        className={styles.floatingBody}
        type="button"
      >
        {isHasCheck && (
          <IconSvgMono src="/icon/check.svg" color="var(--s-500)" size={12} />
        )}
        {children}
      </button>
    </div>
  );
};
