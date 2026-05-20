import { KeyboardEvent, ReactElement, ReactNode } from "react";

export interface FloatingCardProps {
  bodyHeight?: string;
  bodyWidth?: string;
  trigger: ReactElement;
  children: ReactNode;
  isOnTop?: boolean | number;
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
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}
