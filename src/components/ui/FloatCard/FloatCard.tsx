import { FloatingCardBodyProps, FloatingCardProps } from "./Floating.types";
import styles from "./FloatCard.module.scss";
import { useClickOutSide } from "@/hook/useClickOutSide";
import React from "react";
import IconSvgMono from "@/components/Icon/SvgIcon";

export const FloatingCard = ({
  trigger,
  children,
  isOnTop = false,
  isActive,
  setIsActive,
}: FloatingCardProps) => {
  const floatRef = useClickOutSide<HTMLDivElement>(() => {
    setIsActive(false);
  });

  return (
    <div className={styles.warpper} ref={floatRef}>
      {trigger}
      {isActive && (
        <div
          style={
            (isOnTop
              ? { "--position-top": "0", "--position-bottom": "unset" }
              : {
                  "--position-top": "unset",
                  "--position-bottom": "0",
                }) as React.CSSProperties
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
}: FloatingCardBodyProps) => {
  return (
    <div>
      {isHasLine && <hr className={styles.line} />}
      <button
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
