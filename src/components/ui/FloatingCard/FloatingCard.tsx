import { FloatingCardBodyProps, FloatingCardProps } from "./Floating.types";
import styles from "./FloatingCard.module.scss";
import { useClickOutSide } from "@/hook/useClickOutSide";
import React from "react";
import IconSvgMono from "@/components/Icon/SvgIcon";

export const FloatingCard = ({
  bodyWidth = "100%",
  trigger,
  children,
  isOnTop = false,
  isActive,
  isOnRight = false,
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
            {
              ...(isOnTop
                ? {
                    "--position-top": "auto",
                    "--position-bottom": "100%",
                  }
                : {
                    "--position-top": "0%",
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
