import { FloatingCardBodyProps, FloatingCardProps } from "./Floating.types";
import styles from "./FloatCard.module.scss";
import { useClickOutSide } from "@/hook/useClickOutSide";

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
      <div>{trigger}</div>
      {isActive && <div className={styles.floating}>{children}</div>}
    </div>
  );
};

FloatingCard.body = ({
  isHasLine = false,
  children,
  onClick = () => {},
}: FloatingCardBodyProps) => {
  return (
    <div>
      {isHasLine && <hr />}
      <button
        onClick={() => onClick()}
        className={styles.floatingBody}
        type="button"
      >
        {children}
      </button>
    </div>
  );
};
