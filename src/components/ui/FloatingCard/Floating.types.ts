import { ReactElement, ReactNode } from "react";

export interface FloatingCardProps {
  bodyWidth?: string;
  trigger: ReactElement;
  children: ReactNode;
  isOnTop?: boolean;
  isOnRight?: boolean;
  isActive: boolean;
  setIsActive: (status: boolean) => void;
}
export interface FloatingCardBodyProps {
  width?: string;
  isHasLine?: boolean;
  children: ReactNode;
  isHasCheck?: boolean;
  onClick?: () => void;
}
