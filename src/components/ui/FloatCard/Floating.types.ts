import { ReactElement, ReactNode } from "react";

export interface FloatingCardProps {
  trigger: ReactElement;
  children: ReactNode;
  isOnTop?: boolean;
  isActive: boolean;
  setIsActive: (status: boolean) => void;
}
export interface FloatingCardBodyProps {
  isHasLine?: boolean;
  children: ReactNode;
  onClick?: () => void;
}
