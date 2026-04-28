import { FloatingCardBodyProps, FloatingCardProps } from "./types";
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
    <div ref={floatRef}>
      <div>{trigger}</div>
      <div>{isActive && <div>{children}</div>}</div>
    </div>
  );
};

FloatingCard.body = ({ isHasLine, children }: FloatingCardBodyProps) => {
  return <div>{children}</div>;
};
