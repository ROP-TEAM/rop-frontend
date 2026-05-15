import { KeyboardEvent, ReactElement, ReactNode } from "react";

export interface FloatingCardProps {
  bodyWidth?: string;
  trigger: ReactElement;
  children: ReactNode;
  isOnTop?: boolean | "auto";
  isOnRight?: boolean;
  isActive: boolean;
  setIsActive: (status: boolean) => void;
}
export interface FloatingCardBodyProps {
  optionRef?: React.Ref<HTMLButtonElement>;
  width?: string;
  isHasLine?: boolean;
  children: ReactNode;
  isHasCheck?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}
